
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../../src/theme';
import InputAdornment from '@mui/material/InputAdornment';
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from 'react';
import axios from "axios";


function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (event) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  
  


  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"
      sx={
        {
            backgroundColor: 'darkblue.main',
            borderRadius: '10px',
            color: 'white.main',
            '.MuiInputLabel-root, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': {
              color: 'inherit',
              borderColor: 'currentColor',
            }

    const sendData = {
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/users/signup",
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
          },

        }
      );

      if (response.status == 200) {
        const token = response.data.token;
        localStorage.setItem("jsonwebtoken", token);
      }
    } catch (error) {
      console.error("signup failed: " + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#121231",
          borderRadius: "10px",
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

          <Avatar sx={{ m: 1, bgcolor: 'yelow.main' }}>
            <LockOutlinedIcon 
            sx={{
                fill: 'inherit',
              }}
            />
          </Avatar>
          <Typography 
          component="h1" 
          variant="h5"
          sx={{
            color: 'yelow.main',
          }}

          >
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color = 'yelow'

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="yelow"


                  // focused
                />
              </Grid>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="user-name"
                  color="yelow"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <EyeIcon onClick={handleClickShowPassword} color='white'/>
                    </InputAdornment>
                    ),
                    }}
                  id="password"
                  autoComplete="new-password"
                  color="yelow"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <EyeIcon onClick={handleClickShowPassword} color='white'/>
                    </InputAdornment>
                    ),
                    }}
                  id="ConfirmPassword"
                  color="yelow"
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
              Sign Up
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
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
