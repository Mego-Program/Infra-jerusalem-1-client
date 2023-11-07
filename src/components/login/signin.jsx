import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../src/theme";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from '@mui/material/FormHelperText';
import {useNavigate} from 'react-router-dom';
import urlPage from "../../../url/urlPath";



function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={{ color: "verydarkblue" }}
    >
      <Link href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.



const defaultTheme = createTheme();

export default function SignIn() {
  const[emailError, setemailError] = useState("")
  const[pasError, setPasError] = useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();}
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") && data.get("password")){
      setPasError("")
      setemailError("")
    const sendData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(urlPage + "users/login", {
        sendData,

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        const token = response.data.token;
        localStorage.setItem("jsonwebtoken", token);
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed: " + error.message);
    }
  }
  else{
    if(!data.get("email")){
      setemailError("This field is required")
    }
    else{
      setemailError("")
    }
    if(!data.get("password")){
      setPasError("This field is required")
    }
    else{
      setPasError("")
    }
  }
};

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "darkblue.main",
          borderRadius: "10px",
          color: "white.main",
          ".MuiInputLabel-root, .MuiSvgIcon-root, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="yelow"
            />
            <FormHelperText id="standard-weight-helper-text" error='true'>{emailError}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="white"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              id="password"
              autoComplete="current-password"
              color="yelow"
            />
            <FormHelperText id="standard-weight-helper-text" error='true'>{pasError}</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="yelow"
                  sx={{
                    color: "white.main",
                    ".MuiSvgIcon-root": {
                      color: "inherit",
                      borderColor: "currentColor",
                    },
                  }}
                />
              }
              label="Remember me"
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
              Sign In
            </Button>
            <Grid
              container
              sx={{
                marginBottom: "20px",
              }}
            >
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
