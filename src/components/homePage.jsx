import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "darkblue.main",
          borderRadius: "10px",
          color: "white.main",
          ".MuiInputLabel-root, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline": {
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
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "yelow.main",
            }}
          >
            Welcome to {props.companyName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Link to=".\login\signin.jsx" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                color="yelow"
              >
                Log In
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
