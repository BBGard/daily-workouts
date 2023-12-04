import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Recovery from './Pages/Recovery';
import Warmups from './Pages/Warmups';
import Workouts from './Pages/Workouts';
import ErrorPage from './Pages/ErrorPage';
import Stretches from './Pages/Stretches';
import Auth from './Pages/SignIn';
import { ResponsiveAppBar } from "./Components/ResponsiveAppBar";
import {Container} from '@mui/material';
import {ScrollToTopButton} from './Components/ScrollToTopButton';


function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Check if cookies contain user data
    if (user === null && document.cookie.includes('user')) {
      // If user data is found, set user state to the data
      setUser(JSON.parse(document.cookie.split(';')[0].slice(5)));
    }
  }, [user]);

  return (
    <>
      <ResponsiveAppBar userData={user}/>

      <Container
        component="main"
        // maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "100%",
          minHeight: "calc(100vh - 5rem)",
          marginTop: "5rem",
          padding: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/warmups" element={<Warmups />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/stretches" element={<Stretches />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
        <ScrollToTopButton />
      </Container>
    </>
  );
}

export default App;
