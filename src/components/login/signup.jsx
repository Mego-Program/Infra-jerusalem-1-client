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
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { GetCode } from "./getCodeByEmail";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@mui/material";
import urlPage from "../../../url/urlPath";
import { green } from "@mui/material/colors";
import Collapse from '@mui/material/Collapse';



function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const [focusedPass, setFocusedPass] = useState(false);
  const [fNameError, setfNameError] = useState("");
  const [lNameError, setlNameError] = useState("");
  const [uNameError, setuNameError] = useState("");
  const [uNameAvailable, setuNameAvailable] = useState("");
  const [emailError, setemailError] = useState("");
  const [passLength, setpassLength] = useState(false);
  const [passLowercase, setpassLowercase] = useState(false);
  const [passUppercase, setpassUppercase] = useState(false);
  const [passNumbers, setpassNumbers] = useState(false);
  const [passSpecialChars, setpassSpecialChars] = useState(false);
  const [emailExists, setemailExists] = useState("");
  const [pasError, setPasError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {

    event.preventDefault();
  };
  const [page, setPage] = useState("code");
  const [email, setEmail] = useState("");

  function validatePassword(password) {
    setpassLength(password.length >= 8);
    setpassLowercase(/[a-z]/.test(password));
    setpassUppercase(/[A-Z]/.test(password));
    setpassNumbers(/\d/.test(password));
    setpassSpecialChars(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
    return ;
  }
  function validateEmail(email){
    return !(/@/.test(email) && /[.]/.test(email))
  }
  const usernameCheck = async (event) => {
    if (event.target.value == "") {
      setuNameAvailable("");
    } else {
      try {
        const response = await axios.post(
          urlPage + "users/userName",
          { Name: event.target.value }
        );
        if (response.status == 200 && event.target.value!= "") {
          setuNameAvailable("Available!");
        }
      } catch (error) {
        setuNameAvailable("Not available!");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if (
      data.get("email") &&
      data.get("password") &&
      data.get("firstName") &&
      data.get("lastName") &&
      data.get("username") &&
      !errorMessage &&
      passLength &&
      passLowercase &&
      passNumbers &&
      passSpecialChars &&
      passUppercase &&
      !(validateEmail(data.get("email")))
    ) {
      console.log("yes");
      const sendData = {
        email: data.get("email"),
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        username: data.get("username"),
      };

      try {
        const response = await axios.post(
          urlPage + "users/signup",
          sendData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status == 200) {
          setPage("code");
        }
      } catch (error) {
        if (error.response.data.errors.msg == "one of the information is error"){
          setemailExists("emailExists")
        } else{
          setemailExists("")
        }
      }
    } else {
      if (!data.get("firstName")) {
        setfNameError("This field is required");
      } else {
        setfNameError("");
      }
      if (!data.get("lastName")) {
        setlNameError("This field is required");
      } else {
        setlNameError("");
      }
      if (!data.get("email")) {
        setemailError("This field is required");
      } else if (validateEmail(data.get("email"))) {
        setemailError("The email address is incorrect");
      } else {
        setemailError("");
      }
      if (!data.get("username")) {
        setuNameError("This field is required");
      } else {
        setuNameError("");
      }
      if (!data.get("password")) {
        setPasError("This field is required");
      } else {
        setPasError("");
      }
    }
  };

  let icon = null;

  if (uNameAvailable === "Not available!") {
    icon = <CloseIcon style={{ color: "red" }} />;
  } else if (uNameAvailable === "Available!") {
    icon = <DoneIcon style={{ color: "green" }} />;
  } else {
    icon = null;
  }

  let linkforgut = null;

  if (emailExists == "emailExists"){
    linkforgut = <>
      <FormHelperText
        id="standard-weight-helper-text"
        error="true"
      >
      The email address is already registered in the system,
      </FormHelperText>
      <Link href="/forgot" variant="body2">
      Forgot password?
      </Link>
    </>
  }

  

  useEffect(() => {
    if (password === confirmPassword) {
      setErrorMessage("");
    } else {
      setErrorMessage("The passwords do not match");
    }
  }, [password, confirmPassword]);

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
                      autoComplete="off"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      color="yelow"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {fNameError}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="off"
                      color="yelow"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {lNameError}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                      color="yelow"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {emailError}
                    </FormHelperText>
                    {linkforgut}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={usernameCheck}
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      autoComplete="off"
                      color="yelow"
                      InputProps={{
                        endAdornment: (
                          <Icon edge="end" color="white">
                            {icon}
                          </Icon>
                        ),
                      }}
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {uNameError}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      id="password"
                      autoComplete="off"
                      color="yelow"
                      onFocus={() => setFocusedPass(true)}
                      onBlur={() => setFocusedPass(false)}
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {pasError}
                    </FormHelperText>
                    <Collapse timeout={1000} in={focusedPass}>
                    <FormHelperText id="standard-weight-helper-text" sx={{ color: '#008000' }} error={!passUppercase}  >• Capital letter</FormHelperText>
                    <FormHelperText id="standard-weight-helper-text" sx={{ color: '#008000' }} error={!passLowercase} >• lower-case letter</FormHelperText>
                    <FormHelperText id="standard-weight-helper-text" sx={{ color: '#008000' }} error={!passSpecialChars} >• Special Chars</FormHelperText>
                    <FormHelperText id="standard-weight-helper-text" sx={{ color: '#008000' }} error={!passLength} >• Minimum 8 characters</FormHelperText>
                    <FormHelperText id="standard-weight-helper-text" sx={{ color: '#008000' }} error={!passNumbers} >• Number</FormHelperText>
                    </Collapse>
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      required
                      fullWidth
                      autoComplete="off"
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
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      id="ConfirmPassword"
                      color="yelow"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {errorMessage}
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
                    <Link href="/" variant="body2">
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
