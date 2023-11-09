import * as React from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import urlPage from "../../../url/urlPath.js";
import { useState, useEffect } from "react";



function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

export default function GetPassword(props) {

  const navigate = useNavigate();
  const [passwordError, setpasswordError] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(true); // Define isPasswordCorrect


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");


    if (password) {
      setpasswordError("");

    try {
      const response = await axios.post( urlPage + "forgetPassword/password", {

     password: password, 
    
        email: props.email
      }
        );
console.log("try");

      setIsEmailCorrect(true)
      console.log("iscorect");
      navigate('/')

    } catch (error) {
      console.error("An error occurred:", error);

      if (error.response.data.mag === 'not a corect code') {
        console.log("if");
        setpasswordError("Password is incorrect"); // Corrected setpasswordError to setPasswordError
      }
    console.log(error.response.data.mag);
        console.log('error');
  }
}
  };
   
  return (
    <>
    
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
            Password verification
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  id="password"
                  label="Enter the new password"
                  name="password"
                  autoFocus
                  color="yelow"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="yelow"
            >
              Send
            </Button>
            <Grid
              container
              sx={{
                marginBottom: "20px",
              }}
              justifyContent="flex-end"
            >
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
   
   </>
 );
}
