import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Recovery from './Pages/Recovery';
import Warmups from './Pages/Warmups';
import Workouts from './Pages/Workouts';
import ErrorPage from './Pages/ErrorPage';
import { ResponsiveAppBar } from "./Components/ResponsiveAppBar";
import {Container} from '@mui/material';


function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#454545", height: "100%", minHeight: "100vh" }}
    >
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/warmups" element={<Warmups />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Container>
  );
}

export default App;
