
import React, { useEffect } from "react";
import { useState } from "react";
import { workouts } from "../Data/workoutData";
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  TextField,

} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import WorkoutCard from "../Components/WorkoutCard";

const Stretches = () => {
  // Select only stretches from workout data
  const stretches = workouts.filter(
      (workout) => workout.category.includes("Stretch")
    );

  const [workoutsToShow, setWorkoutsToShow] = useState(
    workouts.filter((workout) => workout.category.includes("Stretch"))
  ); // workouts to show

  const [searchText, setSearchText] = useState([]); // search text
  // const [tabSelection, setTabSelection] = useState("All"); // muscle groups


  // Filter the workouts based on search text
  const filterWorkouts = () => {
    let filteredWorkouts; // workouts to show

    // If there is search text, filter workouts by search text
    if (searchText.length > 0) {
      filteredWorkouts = stretches.filter((workout) => {
        return (
          workout.name.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.category.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.group.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    } else {
      filteredWorkouts = stretches;
    }

    // Set the workouts to show
    setWorkoutsToShow(filteredWorkouts);
  };

  // Sort routines by score on each load
  useEffect(() => {
    // calculate a score for each workout based on watch count and rating
    const stretchList = workouts.filter(
      (workout) => workout.category.includes("Stretch")
    );
    stretchList.forEach((workout) => {
      workout.score = workout.rating - workout.watchCount;
    });

    // sort the workouts by score
    stretchList.sort((a, b) => (a.score > b.score ? -1 : 1));

    // set the workouts to show
    setWorkoutsToShow(stretchList);
  }, []);


  return (
    <Box sx={{ my: 4 }}>
    <Typography
      variant="h4"
      component="h1"
      color={"text.tertiary"}
      textAlign={"center"}
      gutterBottom
    >
      Stretches
    </Typography>

    <Card sx={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
      <Typography
        variant="h6"
        component="h6"
        color={"text.primary"}
        textAlign={"left"}
        gutterBottom
      >
        Find a Routine
      </Typography>

      <FormControl sx={{ width: "100%" }}>
        {/* Keyword search */}
        <TextField
          id="keyword-search"
          label="Type here to search"
          variant="outlined"
          sx={{ color: "text.primary" }}
          onChange={(event) => {
            setSearchText(event.target.value.trimEnd());
          }}
          autoComplete="off"
        />
      </FormControl>


      <CardActions
        sx={{ justifyContent: "center", gap: "1rem", marginTop: "1rem" }}
      >
        <Button
          variant="contained"
          color="buttonSuccess"
          onClick={filterWorkouts}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSearchText("");
            setWorkoutsToShow(stretches);
          }}
        >
          Clear
        </Button>
      </CardActions>
    </Card>


    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 auto",
      }}
    >
      {workoutsToShow.map((routine) => (
        <WorkoutCard key={routine.id} workout={routine} size="small" />
      ))}
    </Box>
  </Box>
  );
};

export default Stretches;
