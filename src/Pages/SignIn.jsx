
import React from 'react';
import 'firebase/auth';
import {auth, provider} from '../Config/firebase';
import { signInWithPopup } from 'firebase/auth';
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import fitnessImage from '../images/undraw_fitness_stats..svg';

export const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);

      // Save login cookies
      const user = results.user;
      const token = user.accessToken;
      const userCookie = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        token: token,
      };
      document.cookie = `user=${JSON.stringify(userCookie)}; max-age=3600; path=/`;

      // Redirect to home page
      window.location.href = '/';

      console.log(results);
    }
    catch(error) {
      console.log(error);
    }

  }
  return (
    <Box sx={{ my: 4 }}>
      <Card
        sx={{
          maxWidth: 640,
          width: "100%",
          margin: "1rem auto",
          paddingBottom: "1rem",
        }}
      >
        <CardMedia
          component="img"
          alt="workout graphic"
          image={fitnessImage}
          sx={{ padding: "2rem" }}
        />
        <CardContent
          sx={{
            textAlign: "center",
            margin: "0 auto",
            marginBottom: "1rem",
            width: { xs: "100%", md: "50%" },
            maxWidth: "80vw",
          }}
        >
          <Typography
            variant="h4"
            color={"text.secondary"}
            sx={{ fontWeight: "700" }}
          >
            Hello
          </Typography>
          <Typography variant="primary" color={"text.secondary"}>
            Are you ready to track your stats, rate your workouts, and save your
            favorites?
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Button
              size="large"
              variant="contained"
              sx={{
                width: { xs: "100%", md: "50%" },
                maxWidth: "50vw",
                borderRadius: "25px",
              }}
              color="secondary"
              onClick={signInWithGoogle}
            >
              Log In
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              sx={{
                width: { xs: "100%", md: "50%" },
                maxWidth: "50vw",
                borderRadius: "25px",
                border: "2px solid",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}


export default Auth;
