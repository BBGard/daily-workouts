import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#127f28',
      text: '#ffffff',
    },
    secondary: {
      main: '#1e232f',
      // b2ff34
    },
    tertiary: {
      main: '#4b807b',
    },
    button: {
      main: '#b2ff34',

    },

    error: {
      main: red.A400,
    },
    background: {
      default: '#282f3e',
      // 2e2b2c
    },
    card: {
      default: '#dc143c',
    },

    // Define default font color
    text: {
      primary: '#000000',
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
