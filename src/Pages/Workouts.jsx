import React from 'react';
import { workouts } from '../Data/workoutData';
import { Link } from 'react-router-dom';
import { Autocomplete, Typography, Box, Card, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

const Workouts = () => {

const [allWorkouts, setAllWorkouts] = useState(workouts); // all workouts
const [workoutsToShow, setWorkoutsToShow] = useState(workouts); // workouts to show

// List of muscle groups and workout types
const muscleGroups = [
  "Abs",
  "Back",
  "Biceps",
  "Chest",
  "Full Body",
  "Glutes",
  "Legs",
  "Shoulders",
  "Triceps",
];


const workoutTypes = [
  "Weights",
  "Warmups",
  "Rehabilitation",
];

// Filter the workouts to show based on the selected muscle group and workout type
const filterWorkouts = (keyword) => {
  console.log("Filtering workouts");
  console.log(keyword);

  // Filter workoutsToShow based on the keyword look for keyword in name and category
  const filteredWorkouts = allWorkouts.filter((workout) =>
    workout.name.toLowerCase().includes(keyword.toLowerCase()) ||
    workout.category.toLowerCase().includes(keyword.toLowerCase())
  );


  setWorkoutsToShow(filteredWorkouts);
};

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" color={"white"} textAlign={"center"} gutterBottom>
        All Workouts
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

        <Autocomplete

        id="Muscle Group"
        options={muscleGroups}
        getOptionLabel={(option) => option}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Muscle Group" />}
        onSelect={(event) => {
          filterWorkouts(event.target.value);
        }
        }
        />

        <Autocomplete
        id="Workout Type"
        options={workoutTypes}
        getOptionLabel={(option) => option}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Workout Type" />}
        onSelect={(event) => {
          filterWorkouts(event.target.value);
        }
        }
        />

{/* TODO Add min max duration selections */}

        {workoutsToShow.map((workout) => (
          <Card
            key={workout.id}
            sx={{
              maxWidth: 345,
              margin: "1rem auto",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Link onClick={ ()=> {
              window.open(workout.link, "_blank")
            }}>
              <img
                src={workout.thumbnail}
                alt={workout.name}
                style={{ width: "100%" }}
              />
            </Link>
            <Typography
              variant="h6"
              component="h2"
              color={"white"}
              textAlign={"center"}
              gutterBottom
              marginTop={"1rem"}
            >
              {workout.duration} {workout.name}
            </Typography>
          </Card>
        ))}

        </Box>

    </Box>

  )
};

export default Workouts;
