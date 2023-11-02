import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    
    verydarkblue: {
      main: '#21213E',
    },
    darkblue: {
      main: '#121231',
    },
    error: {
      main: red.A400,
    },
    yelow: {
        main: '#F6C927',
    },
    white: {
        main: '#fff',
    },
    borderColor: {
      primary: '#fff', // Set the text color to white
    },
    
    
  },
  
});

export default theme;
