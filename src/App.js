// import logo from './logo.svg';
import "./App.css";
import * as React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Benjamin Gardiner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  return (
    <Container maxWidth="xl" sx={{backgroundColor:"#454545", height:"100vh"}}>
      <ResponsiveAppBar />

      <Box sx={{ my: 4, height:"100%", maxHeight: "50vh"}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom color={'white'}>
          Daily Workouts
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
