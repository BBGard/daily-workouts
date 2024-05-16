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
import { useGetWorkoutData } from "./hooks/useGetWorkoutData";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {
  // const queryClient = new QueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // globally default to 60 seconds
        staleTime: 1000 * 60,
      },
    },
  })
  // const workoutData  = useGetWorkoutData();

  return (
    <>
    <QueryClientProvider client={queryClient}>
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
            <Route
              path="/recovery"
              element={<Recovery />}
            />
            <Route
              path="/warmups"
              element={<Warmups />}
            />
            <Route
              path="/workouts"
              element={<Workouts  />}
            />
            <Route
              path="/stretches"
              element={<Stretches />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/auth" element={<SignIn />} />
            {/* <Route path="/" element={<Home workoutData={workoutData} />} />
            <Route
              path="/recovery"
              element={<Recovery workoutData={workoutData} />}
            />
            <Route
              path="/warmups"
              element={<Warmups workoutData={workoutData} />}
            />
            <Route
              path="/workouts"
              element={<Workouts workoutData={workoutData} />}
            />
            <Route
              path="/stretches"
              element={<Stretches workoutData={workoutData} />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/auth" element={<SignIn />} /> */}
          </Routes>
          <ScrollToTopButton />
        </Container>
        </QueryClientProvider>
    </>
  );

}

export default App;
