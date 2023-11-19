import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Recovery from './Pages/Recovery';
import Warmups from './Pages/Warmups';
import Workouts from './Pages/Workouts';
import ErrorPage from './Pages/ErrorPage';
import { ResponsiveAppBar } from "./Components/ResponsiveAppBar";
import {Container} from '@mui/material';
import {ScrollToTopButton} from './Components/ScrollToTopButton';


function App() {
  return (
    <>
      <ResponsiveAppBar />

      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "100%",
          minHeight: "calc(100vh - 5rem)",
          marginTop: "5rem",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/warmups" element={<Warmups />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ScrollToTopButton />
      </Container>
    </>
  );
}

export default App;
