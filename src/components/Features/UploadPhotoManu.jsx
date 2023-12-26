import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Badge from '@mui/material/Badge';
import { useAtom } from "jotai";
import { tokenAtom, userInfo } from '../../atoms/atomsFile';
import EditIcon from '@mui/icons-material/Edit';
import urlPage from "../../../url/urlPath";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  width: 0,
});



const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function UploadPhotoManu() {
  const [info, setUser] = useAtom(userInfo);
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    event.preventDefault();
    const data = new FormData();
    data.append('image', file);
    data.append('email', info.email);

    
    try {
      const response = await axios.post(
        urlPage + "users/ChangeProfilePicture",
        data
      );
      console.log(response.data.msg);
      if (response.status === 200){
        
      }
      
    } catch (error) {
      console.error(error);
    }   
  };

  return (
    <Button component="label">
      <Badge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    badgeContent={
      <SmallAvatar sx={{backgroundColor:"#121231"}}>
        <EditIcon sx={{fontSize:15}}/>
      </SmallAvatar>
    }
    >
      <VisuallyHiddenInput
        name="image"
        accept="image/jpeg, image/png"
        type="file"
        onChange={uploadImage}
      />
    <Avatar alt="" src={info.image} />
  </Badge>
  </Button>
  );
}
