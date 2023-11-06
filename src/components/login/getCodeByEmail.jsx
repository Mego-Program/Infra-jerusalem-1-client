import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';



function Copyright(props) {
  return (
    <Typography variant="body2"  align="center" {...props}>
      
      <Link color="inherit" href="https://mui.com/">
        
      </Link>
     
    </Typography>
  );
}



export default function GetCode() {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email1'),
    });
  };
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
        }
    }
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
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
            Email verification
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}> 
              <TextField 
              margin="normal"
              id="email"
              label="Enter the code"
              name="email1"
              autoFocus
              color='yelow'
              type='email'
            />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='yelow'
            >
              Sand
            </Button>
            <Grid container 
            sx={{
                marginBottom: '20px',
              }}
            justifyContent="flex-end">
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
