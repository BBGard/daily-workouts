import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Recovery from "./Pages/Recovery";
import Warmups from "./Pages/Warmups";
import Workouts from "./Pages/Workouts";
import ErrorPage from "./Pages/ErrorPage";
import Stretches from "./Pages/Stretches";
import SignIn from "./Pages/SignIn";
import { ResponsiveAppBar } from "./Components/ResponsiveAppBar";
import { Container } from "@mui/material";
import { ScrollToTopButton } from "./Components/ScrollToTopButton";
// import { useGetWorkoutData } from './hooks/useGetWorkoutData';

import { supabase } from './Config/supabase.config';

function App() {
  // const { allWorkoutData } = useGetWorkoutData();

  // console.log("In app.js: ", allWorkoutData)


  // Supabase test
  async function supaBaseTest() {
    console.log("initialize test");

    const { data, error } = await supabase.from("workouts").select();

    console.log("Data: ", data);
  }

  supaBaseTest();


  return (
    <>
      <Container
        component="main"
        maxWidth="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "100%",
          // minHeight: "calc(100vh - 5rem)",
          // marginTop: "3.5rem",
          padding: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
        }}
      >
        <ResponsiveAppBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/warmups" element={<Warmups />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/stretches" element={<Stretches />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/auth" element={<SignIn />} />
        </Routes>
        <ScrollToTopButton />
      </Container>
    </>
  );

}

export default App;
