/**
 * @fileoverview Home page for the app. Displays the recommended workout for the day.
 */
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Slide,
} from "@mui/material";
import { workouts, workoutSchedule } from "../Data/workoutData";

const Home = () => {
  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState();



  // On mount, load the workouts from localStorage or use the default workouts
  useEffect(() => {
    // Check if there is a local copy of workouts
    const savedAllWorkouts = JSON.parse(localStorage.getItem("allWorkouts"));

    // Generate today's workouts and recommended workout
    const generateTodaysWorkouts = (workoutData) => {
      console.log("Generating todays workout");
      const lastGeneratedTimestamp = localStorage.getItem(
        "lastGeneratedTimestamp"
      );
      const currentDate = new Date();

      // Check if the workouts need to be regenerated
      if (
        todaysWorkouts.length === 0 ||
        !lastGeneratedTimestamp ||
        currentDate.getDate() !== new Date(lastGeneratedTimestamp).getDate()
      ) {
        const workoutList = workoutData.filter((workout) =>
          workout.category.includes(
            // Javascript uses 0-6 for Sunday-Saturday
            workoutSchedule[currentDate.getDay()].workout
          )
        );

        workoutList.sort((a, b) => (a.watchCount > b.watchCount ? 1 : -1));

        // console.log("workoutData", workoutData);
        // console.log("Generated new workouts", workoutList);

        setTodaysWorkouts(workoutList);

        // Store the current date as the last generated timestamp
        localStorage.setItem("lastGeneratedTimestamp", currentDate);

        // Set the recommended workout
        setRecommendedWorkout(workoutList[0]);
      }
    };

    if (savedAllWorkouts && savedAllWorkouts.length > 0) {
      console.log("Loading saved workouts");
      setAllWorkouts(savedAllWorkouts);
    } else {
      console.log("Loading default workouts");

      // Save the default workouts to local storage
      localStorage.setItem("allWorkouts", JSON.stringify(workouts));
    }

     // Generate today's workouts and recommended workout
     generateTodaysWorkouts(workouts);
  }, [todaysWorkouts.length]);


  // Increment the recommended workout
  const incrementRecommendedWorkout = () => {
    const currentWorkoutIndex = todaysWorkouts.indexOf(recommendedWorkout);

    if (currentWorkoutIndex < todaysWorkouts.length - 1) {
      setRecommendedWorkout(todaysWorkouts[currentWorkoutIndex + 1]);
    } else {
      setRecommendedWorkout(todaysWorkouts[0]);
    }
  };

  // Watch the selected workout
  function watchSelectedWorkout() {

    // Log the recommended workout
    console.log("Recommended workout", recommendedWorkout);

    // Increment the watch count
    recommendedWorkout.watchCount++;

    // Find recommendedWorkout in allWorkouts and update it
    const updatedWorkouts = allWorkouts.map((workout) => {
      if (workout.name === recommendedWorkout.name) {
        return recommendedWorkout;
      } else {
        return workout;
      }
    });

    // Update allWorkouts
    setAllWorkouts(updatedWorkouts);

    // Log the updated workout from allWorkouts
    console.log("Updated workout", allWorkouts.find(workout => workout.name === recommendedWorkout.name));
    // Save the updated allWorkouts to local storage
    localStorage.setItem("allWorkouts", JSON.stringify(updatedWorkouts));

    window.open(recommendedWorkout.link, "_blank");
  }

  return (
    <Box sx={{ my: 4, height: "100%", maxHeight: "70vh" }}>
      {recommendedWorkout && (
        // <Slide in={true} timeout={1000}>
        <Slide
          direction="right"
          timeout={500}
          in={true}
          mountOnEnter
          unmountOnExit
        >


          <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>
            {/* <Typography
              variant="h5"
              component="h1"
              align="center"
              gutterBottom
              marginTop={"1rem"}
              flex="1"
            >
              {workoutSchedule[new Date().getDay()].day}-{" "}
              {workoutSchedule[new Date().getDay()].workout}
            </Typography> */}
            <CardMedia
              component="img"
              alt="workout video screenshot"
              height="190"
              // image={recommendedWorkout.thumbnail}
              image={recommendedWorkout.thumbnail}
            />
            <CardContent
              sx={{ textAlign: "center", margin: "0 auto", height: "15vh" }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Recommended Workout
              </Typography>
              <Typography variant="h7" color="text.primary">
                {recommendedWorkout.name}
                <br></br>
                Duration: {recommendedWorkout.duration}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button size="small" onClick={incrementRecommendedWorkout}>
                Next
              </Button>
              <Button size="small" onClick={watchSelectedWorkout}>
                Watch
              </Button>
            </CardActions>
          </Card>
        </Slide>
      )}
    </Box>
  );
}

export default Home;
