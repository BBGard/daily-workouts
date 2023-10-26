import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Recovery from './Pages/Recovery';
import Warmups from './Pages/Warmups';
import Workouts from './Pages/Workouts';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/warmups" element={<Warmups />} />
      <Route path="/workouts" element={<Workouts />} />
    </Routes>
    </>
  );
}

export default App;
