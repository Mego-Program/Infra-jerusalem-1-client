import React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsIcon from "@mui/icons-material/Notifications";

const ProfileCard = ({
  userIcon,
  userName,
  userRole,
  isOnline,
  notifications,
  numMessages,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#121231",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Badge
        overlap="circular"
        variant="dot"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: isOnline ? "green" : null,
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
            src="https://simchasucot.github.io/myWebsite/myIcon/icon4.jpg" //{userIcon}
            sx={{ width: 40, height: 40 }}
          />
        </div>
      </Badge>

      <div style={{ marginLeft: "10px" }}>
        <div>Simcha Sucot{userName}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>
          Software Developer{userRole}
        </div>
      </div>
      <Badge
        badgeContent={numMessages}
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: notifications ? "#FF0000" : null,
          },
        }}
      >
        <IconButton
          sx={{ marginLeft: "auto", padding: "3px", background: "#21213E" }}
          // color="primary"
        >
          <NotificationsIcon sx={{ color: "#FFF" }} />
        </IconButton>
      </Badge>
      <IconButton
        sx={{ padding: "3px", background: "#21213E" }}
        color="primary"
      >
        <MoreHorizIcon sx={{ color: "#FFF" }} />
      </IconButton>
    </div>
  );
};

export default ProfileCard;
