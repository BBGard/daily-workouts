import { createTheme } from "@mui/material/styles";
// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#363537", // 363537 DFB2F4

      //light: '#FF2E00',
      //dark: '#FF2E00',
      //contrastText: '#ffffff',
    },
    secondary: {
      main: "#FF2E00", // 0CCE6B 4F646F
    },
    error: {
      main: "#EF2D56", // EE2E31 // EF2D56 BC4749
    },
    warning: {
      main: "#ED7D3A", // ED7D3A // ffae00
    },
    info: {
      main: "#7EC4CF",
    },
    success: {
      main: "#A7C957", // C7EF00 // DCED31 A7C957
    },
    background: {
      default: "#ffffff",
      paper: "#FFFFFF", //F2E8CF
    },
    text: {
      primary: "#454545",
      secondary: "#6D676E",
      info: "#7EC4CF",
      warning: "#ED7D3A",
      error: "#EF2D56",
      success: "#A7C957",
      disabled: "#BDBDBD",
    },
    divider: "#BDBDBD",
  },
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
    },

    h1: {
      fontFamily: "Montserrat",
      fontWeight: 700,
      fontSize: "1.8rem",

    },
    h2: {
      fontFamily: "Montserrat",
      fontWeight: 700,
      fontSize: "1.6rem",

    },
    h3: {
      fontFamily: "Montserrat",
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h4: {
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontSize: "1.3rem",
    },
    h5: {
      fontFamily: "Roboto",
      fontWeight: 600,
      fontSize: "1.2em",

    },
    h6: {
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1.1rem",

    },
    subtitle1: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    subtitle2: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    body1: {
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    button: {
      fontFamily: "Montserrat",
      fontWeight: 500,
    },
    caption: {
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
    overline: {
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
  },
  shape: {
    // borderRadius: 25,
  },

  // Theme overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
      },
    },
    // MuiTabs: {
    //   styleOverrides: {
    //     root: {
    //       // Set indicator color
    //       "& .MuiTabs-indicator": {
    //         backgroundColor: "#A7C957",
    //       },
    //     },
    //   },
    // },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       // Set text color
    //       "&.Mui-selected": {
    //         color: "#A7C957",
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
