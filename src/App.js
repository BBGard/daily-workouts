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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./hooks/UserContext";

// import useFetchUser from "./hooks/useFetchUser";

const queryClient = new QueryClient();

function App() {
  // const { user, signOut } = useFetchUser();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
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
            {/* <ResponsiveAppBar user={user} signOut={signOut} /> */}
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
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
