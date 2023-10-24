/**
 * @fileoverview This file defines the main App component.
 */
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import {workouts, workoutSchedule} from "./Data/workouts";
import { Copyright } from "./Components/Copyright";
import { ResponsiveAppBar } from "./Components/ResponsiveAppBar";


function App() {
  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);

  // On mount, load the workouts from localStorage or use the default workouts
  useEffect(() => {
    // Check if there is a local copy of workouts
    const savedAllWorkouts = JSON.parse(localStorage.getItem("allWorkouts"));

    if (savedAllWorkouts) {
      console.log("Loading saved workouts");
      setAllWorkouts(savedAllWorkouts);

      // Generate today's workouts and recommended workout
      generateTodaysWorkouts(savedAllWorkouts);
    } else {
      console.log("Loading default workouts");
      setAllWorkouts(workouts);

      // Generate today's workouts and recommended workout
      generateTodaysWorkouts(workouts);

      // Save the default workouts to local storage
      localStorage.setItem("allWorkouts", JSON.stringify(workouts));
    }
  }, []);

  // Generate today's workouts and recommended workout
  const generateTodaysWorkouts = (workoutData) => {
    const lastGeneratedTimestamp = localStorage.getItem("lastGeneratedTimestamp");
    const currentDate = new Date();

    // Check if the workouts need to be regenerated
    if (
      todaysWorkouts.length === 0 ||
      !lastGeneratedTimestamp ||
      currentDate.getDate() !== new Date(lastGeneratedTimestamp).getDate()
    ) {

      const workoutList = workoutData.filter(
        (workout) =>
          workout.category.includes(workoutSchedule[currentDate.getDay()].workout)
      );

      workoutList.sort((a, b) => (a.watchCount > b.watchCount ? 1 : -1));

      setTodaysWorkouts(workoutList);

      // Store the current date as the last generated timestamp
      localStorage.setItem("lastGeneratedTimestamp", currentDate);

      // Set the recommended workout
      setRecommendedWorkout(workoutList[0]);
    }
  };

  // Save all workouts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("allWorkouts", JSON.stringify(allWorkouts));
  }, [allWorkouts]);

  // Increment the recommended workout
  const incrementRecommendedWorkout = () => {
    const currentWorkoutIndex = todaysWorkouts.indexOf(recommendedWorkout);

    if (currentWorkoutIndex < todaysWorkouts.length - 1) {
      setRecommendedWorkout(todaysWorkouts[currentWorkoutIndex + 1]);
    }
    else {
      setRecommendedWorkout(todaysWorkouts[0]);
    }

  }

  // Watch the selected workout
  function watchSelectedWorkout() {
    // Increment the watch count
    recommendedWorkout.watchCount++;

    // Update the watch count in the allWorkouts array
    const workoutIndex = allWorkouts.indexOf(recommendedWorkout);
    allWorkouts[workoutIndex].watchCount = recommendedWorkout.watchCount;

     // Save the updated allWorkouts to local storage
     localStorage.setItem("allWorkouts", JSON.stringify(allWorkouts));


    window.open(recommendedWorkout.link, "_blank");
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#454545", height: "100vh" }}
    >
      <ResponsiveAppBar />

      <Box sx={{ my: 4, height: "100%", maxHeight: "70vh" }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          color={"white"}
          flex="1"
        >
          {workoutSchedule[new Date().getDay()].day}:{" "}
          {workoutSchedule[new Date().getDay()].workout}
        </Typography>

        <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>
          <CardMedia
            component="img"
            alt="workout video screenshot"
            height="190"
            image={recommendedWorkout.thumbnail}
          />
          <CardContent sx={{ textAlign: "center", margin: "0 auto", height: "15vh" }}>
            <Typography gutterBottom variant="h5" component="div">
              Recommended Workout
            </Typography>
            <Typography variant="h7" color="text.primary">
              {recommendedWorkout.name}<br></br>
              Duration: {recommendedWorkout.duration}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button size="small" onClick={incrementRecommendedWorkout}>Next</Button>
            <Button size="small" onClick={watchSelectedWorkout}>Watch</Button>
          </CardActions>
        </Card>

        <Copyright />
      </Box>
    </Container>
  );
}

export default App;
