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
import theme from "../../../src/theme";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from '@mui/material/FormHelperText';
import GetCode from "./getCodeByEmail";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from "@mui/material";



function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const[fNameError, setfNameError] = useState("")
  const[lNameError, setlNameError] = useState("")
  const[uNameError, setuNameError] = useState("")
  const[uNameAvailable, setuNameAvailable] = useState("")
  const[emailError, setemailError] = useState("")
  const[pasError, setPasError] = useState("")
  const[showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const[errorMessage, setErrorMessage] = useState("")
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();}
  const [page, setPage] = useState("code");
  const [email, setEmail] = useState("");

  const usernameCheck = async (event) => {
    try {
      const response = await axios.post('http://localhost:5050/users/userName', {Name: event.target.value})
      if(response.status == 200){
        setuNameAvailable("Available!")

      }
    } catch (error) {
      setuNameAvailable("Not available!")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") && data.get("password") && data.get("firstName") && data.get("lastName")&& data.get("username") && (!errorMessage)){
      console.log('yes');
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
        setPage("code")

      }
    } catch (error) {
      console.error("signup failed: " + error.message);
    }
  }
else{
  if(!data.get("firstName")){
    setfNameError("This field is required")
  }
  else{
    setfNameError("")
  }
  if(!data.get("lastName")){
    setlNameError("This field is required")
  }
  else{
    setlNameError("")
  }
  if(!data.get("email")){
    setemailError("This field is required")
  }
  else{
    setemailError("")
  }
  if(!data.get("username")){
    setuNameError("This field is required")
  }
  else{
    setuNameError("")
  }
  if(!data.get("password")){
    setPasError("This field is required")
  }
  else{
    setPasError("")
  }
  
}
};

  let icon = null;

    if (uNameError === "Available!") {
      icon = <CloseIcon style={{ color: 'red' }} />;
    } else if (uNameError === "Not available!") {
      icon = <DoneIcon style={{ color: 'green' }} />;
    }
    else{
      icon = null
    }


  useEffect(() => {
    if(password === confirmPassword){
      setErrorMessage("");
    }
    else {
      setErrorMessage("The passwords do not match");
    }
  },
  [password, confirmPassword])
  

  return (
    <>
      {page == "code" && <GetCode email={email} />}
      {page == "signup" && (
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
                    color="yelow"
                  />
                  <FormHelperText id="standard-weight-helper-text" error='true'>{fNameError}</FormHelperText>
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
                  />
                  <FormHelperText id="standard-weight-helper-text" error='true'>{lNameError}</FormHelperText>
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <FormHelperText id="standard-weight-helper-text" error='true'>{emailError}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={usernameCheck}
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="user-name"
                    color="yelow"
                    InputProps={{
                      endAdornment: (
                          <Icon
                            edge="end"
                            color="white"
                          >
                            {icon}
                          </Icon>
                      ),
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text" error='true'>{uNameError}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => {setPassword(e.target.value)}}
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
                    autoComplete="new-password"
                    color="yelow"
                  />
                  <FormHelperText id="standard-weight-helper-text" error='true'>{pasError}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    required
                    fullWidth
                    name="ConfirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="white"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="ConfirmPassword"
                    color="yelow"
                  />
                  <FormHelperText id="standard-weight-helper-text" error='true'>{errorMessage}</FormHelperText>
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
      )}
    </>
  );
}
