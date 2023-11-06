import React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsIcon from "@mui/icons-material/Notifications";

const ProfileCard = ({ userName, userRole, isOnline, notifications }) => {
  return (
    <div
      style={{
        width: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#121231",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Avatar
        sx={{
          width: 30,
          height: 30,
          backgroundColor: isOnline ? "green" : "gray",
          "& .MuiAvatar-img": {
            borderRadius: "50%",
          },
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt={userName}
            src="URL_TO_USER_IMAGE"
            sx={{ width: 30, height: 30 }}
          />
        </div>
      </Avatar>
      <div style={{ marginLeft: "10px" }}>
        <div>Simcha Sucot{userName}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>Software Developer{userRole}</div>
      </div>
      <Badge
        badgeContent={notifications}
        color="secondary"
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <IconButton sx={{ marginLeft: "auto", padding: "3px" , background:'#21213E' }} color="primary">
          <NotificationsIcon sx={{ color: "#FFF"}} />
        </IconButton>
      </Badge>
      <IconButton sx={{ padding: "3px", background:'#21213E'}} color="primary">
        <MoreHorizIcon />
      </IconButton>
    </div>
  );
};

export default ProfileCard;