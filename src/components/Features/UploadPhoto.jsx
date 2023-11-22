import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function shortenString(str) {
    let words = str.split(' ');
    
    if(words.length === 1) {
      return handleWord(words[0]);
    }
    
    if(words.length === 2) {
      return handleWord(words[0]) + ' ' + handleWord(words[1]); 
    }
    
    if(words.length > 2) {
      let result = '';
      result += handleWord(words[0]) + ' ';
      result += handleWord(words[1]) + ' ';
      result += words[2].slice(0,5) + '...';
      return result;
    }
  }
  
  function handleWord(word) {
    if(word.length <= 13) {
      return word;
    }
    
    return word.slice(0,5) + '...' + word.slice(-5);
  }
  

export default function UploadPhoto() {
    const [image, setImage] = useState('Upload a profile photo');

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    setImage(shortenString(file.name));
    console.log(file)

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/upload', formData);
      console.log(response);
    } catch (error) {
      console.error(error);  
    }
  }
  
  return (
    <Button
    sx={{fontSize:'8px', fontWeight:'normal',overflow: 'hidden', height:'56px', border:"solid", borderColor:'yelow.main', color:'yelow.main' }}
    component="label"
    fullWidth
    variant="contained"
    color='darkblue'
    startIcon={<CloudUploadIcon />}>
      {image}
      <VisuallyHiddenInput type="file" onChange={uploadImage}/>
    </Button>
  );
}