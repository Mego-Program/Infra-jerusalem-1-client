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
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import urlPage from "../../../url/urlPath";

import {NavLink} from 'react-router-dom'
import WheelWaiting from '../Features/wheelWaiting'
import Alert from '@mui/material/Alert';
import axiosInstance from '../../../exios/axiosInstance.js'
import Collapse from '@mui/material/Collapse';
import ErrorConection from "../Features/errorConection.jsx";


import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms/atomsFile.jsx";
import { userInfo } from "../../atoms/atomsFile.jsx";


function validateEmail(email){
  return !(/@/.test(email) && /[.]/.test(email))
}

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
  const [token, setToken] = useAtom(tokenAtom);
  const [info, setUserInfo] = useAtom(userInfo);

  const [netError, setNetError] = useState(false)
  const [waiting, setWaiting] = useState(false);
  const [identifyingError, setIdentifyingError] = useState(false)
  const [emailError, setemailError] = useState("");
  const [pasError, setPasError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") && data.get("password") && !validateEmail(data.get("email"))) {
      setPasError("");
      setemailError("");
      const sendData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      setWaiting(true)

      try {
        const response = await axios.post(urlPage + "users/login", {
          sendData,

          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status == 200) {
          const token = response.data.token;
          const user = response.data.user;
          // put the token and the information of the user in local storage.
          localStorage.setItem("jsonwebtoken", token);
          localStorage.setItem("user", JSON.stringify( user));
          
          setUserInfo(user)
          setToken(true)
          navigate("/");
          try {
            axiosInstance.interceptors.request.use((config) => {
              config.headers["x-auth-token"] = token;
              return config;
            });
          } catch (error) {
            console.error(error)
          }
        }
        setWaiting(false)
      } catch (error) {
        if (error.code=='ERR_NETWORK'){
          setNetError(true)
        };
        console.error("Login failed: " + error.message);
        setWaiting(false);
        setIdentifyingError(true)
      }
    } else {
      if (!data.get("email")) {
        setemailError("This field is required");
      } else if (validateEmail(data.get("email"))){
        setemailError("The email address is incorrect");
      } else {
        setemailError("");
      }
      if (!data.get("password")) {
        setPasError("This field is required");
      } else {
        setPasError("");
      }
    }
  };

  return (
    <>
    <WheelWaiting open={waiting}/>
    {netError ? (<ErrorConection/>):(
    <ThemeProvider theme={theme}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src="logo/logo.png" alt=""
          style={{width: '422.89px',
                  top: '171.09px',
                  left: '305px',
                }}/>
          </div>
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
                  autoComplete="off"
                  autoFocus
                  color="yelow"
                />
                <FormHelperText id="standard-weight-helper-text" error="true">
                  {emailError}
                </FormHelperText>
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
                  autoComplete="off"
                  color="yelow"
                />
                <FormHelperText id="standard-weight-helper-text" error="true">
                  {pasError}
                </FormHelperText>
                <Collapse timeout={1000} in={identifyingError}>
                  <Alert severity="warning">
                    One or more of the identifying details you typed are incorrect!</Alert>
                </Collapse>
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
              color='darkblue'
              sx={{ mt: 3, mb: 2, border:"solid", borderColor:'yelow.main', color:'yelow.main', '&:hover': {backgroundColor: 'darkblue.main'  }}}
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
                <NavLink to="/forgot" variant="body2" style={{color:'#fff',textDecoration:'underline'}}>
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>

                <NavLink to="/signup" variant="body2" style={{color:'#fff',textDecoration:'underline'}}>
                  {"Don't have an account? Sign Up"}
                </NavLink>

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )}
    </>
  );
}