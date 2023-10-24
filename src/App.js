// import logo from './logo.svg';
import "./App.css";
import * as React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import workouts from "./Data/links";

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Benjamin Gardiner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  // Initial workout schedule
  const workoutSchedule = [
    {
      day: "Monday",
      workout: "Legs",
    },
    {
      day: "Tuesday",
      workout: "Chest",
    },
    {
      day: "Wednesday",
      workout: "Back",
    },
    {
      day: "Thursday",
      workout: "Shoulders",
    },
    {
      day: "Friday",
      workout: "Arms",
    },
    {
      day: "Saturday",
      workout: "Abs",
    },
    {
      day: "Sunday",
      workout: "Rest",
      duration: "Rest",
    },
  ];

  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = React.useState(
    workouts.filter(
      (workout) => workout.category === workoutSchedule[new Date().getDay()].workout
    )[Math.floor(Math.random() * workouts.filter((workout) => workout.category === workoutSchedule[new Date().getDay()].workout).length)]
  );

  // Regenerate a random workout from the workout schedule
  function regenerateRecommendedWorkout() {
        setRecommendedWorkout(
          workouts.filter(
            (workout) =>
              workout.category === workoutSchedule[new Date().getDay()].workout
          )[
            Math.floor(
              Math.random() *
                workouts.filter(
                  (workout) =>
                    workout.category ===
                    workoutSchedule[new Date().getDay()].workout
                ).length
            )
          ]
        );
  }

  // Watch the selected workout
  function watchSelectedWorkout() {
    window.open(recommendedWorkout.link, "_blank");
  }


  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#454545", height: "100vh" }}
    >
      <ResponsiveAppBar />

      <Box sx={{ my: 4, height: "100%", maxHeight: "70vh"}}>
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

        <Card sx={{ maxWidth: 345, margin: "1rem auto"}}>
          <CardMedia
            component="img"
            alt="workout video screenshot"
            height="190"
            //grab image from recommendedWorkout.link
            // image="https://i.ytimg.com/vi_webp/b0Z81IGUnGI/sddefault.webp"
            image={recommendedWorkout.thumbnail}
          />
          <CardContent sx={{textAlign: "center", margin: "0 auto", height: "15vh"}}>
            <Typography gutterBottom variant="h5" component="div">
              Recommended Workout
            </Typography>
            <Typography variant="h7" color="text.primary">
              {recommendedWorkout.name}<br></br>
              Duration: {recommendedWorkout.duration}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent: "center"}}>
            <Button size="small" onClick={regenerateRecommendedWorkout}>Next</Button>
            <Button size="small" onClick={watchSelectedWorkout}>Watch</Button>
          </CardActions>
        </Card>

        <Copyright/>
      </Box>
    </Container>
  );
}

export default App;
