import React from "react";
// import { workouts } from "../Data/workoutData";
import { Typography, Box } from "@mui/material";
import WorkoutCard from "../Components/WorkoutCard";
import { useGetWorkoutData } from "../hooks/useGetWorkoutData";


function Warmups() {
  // Select only warmups from workout data
  // const warmups = workouts.filter((workout) => workout.category.includes("Warm Up"));
  const workoutData = useGetWorkoutData();
  const warmups = workoutData.warmups;

  console.log("loading? ", workoutData.isLoading);

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        color={"text.tertiary"}
        textAlign={"center"}
        gutterBottom
      >
        Warm Ups
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "0 auto",
        }}
      >

        {warmups && warmups.length > 0 ? (
        warmups.map((warmup) => (
          <WorkoutCard key={warmup.id} workout={warmup} size={"small"} />
        ))
      ) : (
        workoutData.isLoading ? (
        <>
        <WorkoutCard type="skeleton-small" />
        <WorkoutCard type="skeleton-small" />
        <WorkoutCard type="skeleton-small" />
        <WorkoutCard type="skeleton-small" />
        </>
        ) : (
          <WorkoutCard type="missing" />
        )

      )}
      </Box>
    </Box>
  );
}

export default Warmups;
