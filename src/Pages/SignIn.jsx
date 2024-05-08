
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import 'firebase/auth';
// import {auth, provider} from '../Config/firebase';
// import { signInWithPopup } from 'firebase/auth';
import { supabase } from '../Config/supabase.config';
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
// import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const SignIn = () => {

  const navigate = useNavigate();

  // const signInWithGoogle = async () => {
  //   try {
  //     console.log("attempting sign in...");
  //     const result = supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //     })

  //     console.log("result: ", result);

  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // }
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        throw error;
      }

      // Redirect to home page or any other page upon successful sign-in
      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  }

  // Sign in with Google
  // const signInWithGoogle = async () => {
  //   try {
  //     // console.log("attempt sign in");
  //     // console.log("auth: ", auth);
  //     const results = await signInWithPopup(auth, provider);

  //     // Save login cookies
  //     const user = results.user;
  //     const token = user.accessToken;
  //     const userCookie = {
  //       name: user.displayName,
  //       email: user.email,
  //       photo: user.photoURL,
  //       token: token,
  //     };
  //     document.cookie = `user=${JSON.stringify(userCookie)}; max-age=3600; path=/`;

  //     console.log("Signed in with Google");

  //     // Setup user in database
  //     const db = getFirestore();
  //     const usersRef = collection(db, 'users');
  //     const userRef = doc(usersRef, user.uid);
  //     const userDoc = await getDoc(userRef);
  //     if (!userDoc.exists()) {
  //       await setDoc(userRef, {
  //         name: user.displayName,
  //         email: user.email,
  //         photo: user.photoURL,
  //         token: token,
  //         watchCounts: [],
  //         ratings: [],
  //       });
  //     }

  //     // Console log the user
  //     // console.log(user);

  //     // Redirect to home page
  //     navigate('/');

  //     // console.log(results);
  //   }
  //   catch(error) {
  //     console.log(error);
  //   }

  // }


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
              variant="contained"
              sx={{
                width: { xs: "100%", md: "50%" },
                maxWidth: "50vw",
                borderRadius: "25px",
              }}
              color="secondary"
              onClick={signInWithGoogle}
            >
              Log In With Google
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}


export default SignIn;
