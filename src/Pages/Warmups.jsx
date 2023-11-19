import React from "react";
import { workouts } from "../Data/workoutData";
import { Typography, Box } from "@mui/material";
import WorkoutCard from "../Components/WorkoutCard";

function Warmups() {
  // Select only warmups from workout data
  const warmups = workouts.filter((workout) => workout.category === "Warm Up");

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
        {warmups.map((warmup) => (
          <WorkoutCard key={warmup.id} workout={warmup} size={"small"} />
        ))}
      </Box>
    </Box>
  );
}

export default Warmups;
