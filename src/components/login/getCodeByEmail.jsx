import * as React from "react";
import CircularTogetCode from "../CircularToGetCode";
import WheelWaiting from "../Features/wheelWaiting";
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
import urlPage from "../../../url/urlPath";
import {NavLink} from 'react-router-dom'
import { useState } from "react";
import ErrorConection from '../Features/errorConection.jsx'

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

export function GetCode(props) {
  const navigate = useNavigate();
  const [netError, setNetError] = useState(false)
  const [waiting, setWaiting] = useState(false);
  const handleSubmit = async (event) => {
    setWaiting(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    try{
    const result = await axios.post(urlPage + "users/verifyEmail", {
      code: data.get("code"),
      email: props.email,
    });

    if (result.status == 200) {
      navigate("/");
    }
    console.log({
      code: data.get("code"),
      email: props.email,
    });
    setWaiting(false)
  }catch (error){
    if (error.code=='ERR_NETWORK'){
      setNetError(true)
    };
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
            Email verification
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
          <Typography variant="body2" gutterBottom color={'yelow.main'} display='inline'>
            Enter the code sent to you by e-mail to: {' '}
            <Typography variant="body2" gutterBottom color={'white.main'} display='inline'>
            {props.email}
            </Typography>
          </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
          <Typography variant="body2" gutterBottom color={'yelow.main'}>
          The code is valid for 2 minutes:
          </Typography >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularTogetCode typeCode={''}/>
            </Box>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} textAlign="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  id="email"
                  label="Enter the code"
                  name="code"
                  autoFocus
                  color="yelow"
                  type="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="darkblue"
              sx={{ mt: 3, mb: 2, border:"solid", borderColor:'yelow.main', color:'yelow.main', '&:hover': {backgroundColor: 'darkblue.main'}}}
            >
              Send
            </Button>
            <Grid
              container
              sx={{
                marginBottom: "20px",
              }}
              textAlign="center"
            >
              <Grid item xs={12}>

                <NavLink to="/" variant="body2" style={{color:'#fff'}}>

                  Already have an account? Sign in
                </NavLink>
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
