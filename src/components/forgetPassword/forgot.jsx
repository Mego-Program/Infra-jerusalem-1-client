import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";

import GetPassword from "./getPasswordByEmail.jsx";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Forgot() {
  const [emailError, setemailError] = useState("");
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    if (email) {
      console.log("Email is corect!");
      setemailError("");
      try {
        const response = await axios.post(
          "http://localhost:5050/forgetPassword/email",
          { email: email }
        );
        if (response.status == 400) {
          setemailError("Email is incorrect");
        } else {
          setIsEmailCorrect(true);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <>
      {isEmailCorrect ? (
        <GetPassword />
      ) : (
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              backgroundColor: "darkblue.main",
              borderRadius: "10px",
              color: "white.main",
              ".MuiInputLabel-root, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":
                {
                  color: "inherit",
                  borderColor: "currentColor",
                },
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "yelow.main" }}>
                <LockOutlinedIcon
                  sx={{
                    fill: "inherit",
                  }}
                />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  color: "yelow.main",
                }}
              >
                Forgot Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      color="yelow"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {emailError}
                    </FormHelperText>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="yelow"
                >
                  Sand
                </Button>
                <Grid
                  container
                  sx={{
                    marginBottom: "20px",
                  }}
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
