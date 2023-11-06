import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#e82136',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffffff',
    },
    // DEfine font family
    typography: {
      fontFamily: [
        'Montserrat',
        'sans-serif',
      ].join(','),
      body1: {
        fontFamily: [
          'Source Sans Pro',
          'sans-serif',
        ].join(','),
        fontSize: '3rem',
      },
    },
  },

});

export default theme;
