import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";
import Search from "./search";
import ProfileCard from "./ProfileCard";
import { Grid, Button, Box, Stack } from "@mui/material";
import {
  Dashboard,
  Work,
  Assessment,
  PersonAdd,
  Chat,
  Settings,
  Info,
} from "@mui/icons-material";

export default function AppLayout() {
  const [selectedButton, setSelectedButton] = useState(""); // Initialize the first button as selected

  useEffect(() => {
    // Update the selected button based on the current route
    switch (location.pathname) {
      case "/":
        setSelectedButton("Dashboard");
        break;
      case "/Projects":
        setSelectedButton("Projects");
        break;
      case "/Board":
        setSelectedButton("Board");
        break;
      case "/AddUser":
        setSelectedButton("AddUser");
        break;
      case "/Messages":
        setSelectedButton("Messages");
        break;
      case "/Settings":
        setSelectedButton("Settings");
        break;
      case "/Info":
        setSelectedButton("Info");
        break;
      default:
        setSelectedButton("Dashboard");
    }
  }, [location]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <Grid container className="app-layout">
      <Grid item xs={2} className="sidebar">
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          spacing={10}
        >
          <Box>
            <NavLink to="/">
              <Button
                startIcon={<Dashboard />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Dashboard" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Dashboard")}
              >
                Dashboard
              </Button>
            </NavLink>
            <NavLink to="Projects">
              <Button
                startIcon={<Work />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Projects" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Projects")}
              >
                Projects
              </Button>
            </NavLink>
            <NavLink to="Board">
              <Button
                startIcon={<Assessment />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Board" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Board")}
              >
                Board
              </Button>
            </NavLink>
            <NavLink to="AddUser">
              <Button
                startIcon={<PersonAdd />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "AddUser" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("AddUser")}
              >
                Add User
              </Button>
            </NavLink>
            <NavLink to="Messages">
              <Button
                startIcon={<Chat />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Messages" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Messages")}
              >
                Messages
              </Button>
            </NavLink>
          </Box>
          <Box>
            <NavLink to="Settings">
              <Button
                startIcon={<Settings />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Settings" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Settings")}
              >
                Settings
              </Button>
            </NavLink>
            <NavLink to="Info">
              <Button
                startIcon={<Info />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Info" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Info")}
              >
                Info
              </Button>
            </NavLink>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={10}>
        <main>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems= "center"
            spacing={20}
            sx={{ margin: "20px" }}
          >
            <Grid item xs={7.5}>{selectedButton}</Grid>
            <Grid item xs={1.5}>
              <Search />
            </Grid>
            <Grid item xs={3}>
              <ProfileCard />
            </Grid>
          </Stack>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </main>
      </Grid>
    </Grid>
  );
}
