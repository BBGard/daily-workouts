import React, { StrictMode } from 'react';
import {
  BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline'; // CSS Normalization
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}> {/* ThemeProvider makes the theme available down the React tree thanks to React context. */}
      <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <App />       {/* The rest of your application. */}
    </ThemeProvider>
  </BrowserRouter>
  </StrictMode>,
);
