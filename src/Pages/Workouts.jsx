import React from 'react';
import { workouts } from '../Data/workoutData';
import { Link } from 'react-router-dom';
import { Autocomplete, Typography, Box, Button, Card, CardActions, TextField, Input, CardMedia, Skeleton, CardContent, ButtonGroup } from '@mui/material';
import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const Workouts = () => {

const [allWorkouts, setAllWorkouts] = useState(workouts); // all workouts
const [workoutsToShow, setWorkoutsToShow] = useState(workouts); // workouts to show
const [filterKeywords, setFilterKeywords] = useState([]); // filter keywords [muscle group, workout type, duration, etc]
const [muscleGroupsSelection, setMuscleGroupsSelection] = useState([]); // muscle groups
const [workoutTypesSelection, setWorkoutTypesSelection] = useState([]); // workout types

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
const filterWorkouts = () => {
  let filteredWorkouts; // workouts to show

  // If no muscle groups or workout types are selected, show all workouts
  if (
    muscleGroupsSelection.length === 0 &&
    workoutTypesSelection.length === 0
  ) {
    setWorkoutsToShow(allWorkouts);
  }

  // If muscle groups are selected, filter workouts by muscle group
  if (muscleGroupsSelection.length > 0) {
    filteredWorkouts = allWorkouts.filter((workout) => {
      return muscleGroupsSelection.some((muscleGroup) => {
        return workout.group.includes(muscleGroup);
      });
    });
  }

  // If workout types are selected, filter workouts by workout type (category)
  if (workoutTypesSelection.length > 0) {
    filteredWorkouts = filteredWorkouts.filter((workout) => {
      return workoutTypesSelection.some((workoutType) => {
        return workout.category.includes(workoutType);
      });
    });
  }

  // Set the workouts to show
  setWorkoutsToShow(filteredWorkouts);
};


const handleMuscleChange = (event) => {
  const {
    target: { value },
  } = event;
  setMuscleGroupsSelection(
    // On autofill we get a the stringified value.
    typeof value === "string" ? value.split(",") : value
  );
};


const handleWorkoutTypeChange = (event) => {
  const {
    target: { value },
  } = event;
  setWorkoutTypesSelection(
    // On autofill we get a the stringified value.
    typeof value === "string" ? value.split(",") : value
  );
}

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        color={"black"}
        textAlign={"center"}
        gutterBottom
      >
        All Workouts
      </Typography>

      <Card sx={{ maxWidth: 345, margin: "2rem auto", padding: "1rem" }}>
        <Typography
          variant="h6"
          component="h6"
          color={"black"}
          textAlign={"left"}
          gutterBottom
        >
          Find a Workout
        </Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
          <Select
            labelId="muscle-group-label"
            id="muscle-group-checkbox"
            multiple
            value={muscleGroupsSelection}
            onChange={handleMuscleChange}
            input={<Input label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {muscleGroups.map((group) => (
              <MenuItem key={group} value={group}>
                <Checkbox checked={muscleGroupsSelection.indexOf(group) > -1} />
                <ListItemText primary={group} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="workout-type-label">Workout Type</InputLabel>
          <Select
            labelId="workout-type-label"
            id="workout-type-checkbox"
            multiple
            value={workoutTypesSelection}
            onChange={handleWorkoutTypeChange}
            input={<Input label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {workoutTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={workoutTypesSelection.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CardActions sx={{ justifyContent: "center", gap: "1rem", marginTop: "1rem"}}>

          <Button
            variant="contained"
            color="primary"
            onClick={filterWorkouts}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              console.log("Clearing filters");
              setMuscleGroupsSelection([]);
              setWorkoutTypesSelection([]);
              setWorkoutsToShow(allWorkouts);
            }}
          >
            Clear
          </Button>
        </CardActions>

        {/* <Autocomplete
          id="Muscle Group"
          options={muscleGroups}
          getOptionLabel={(option) => option}
          sx={{ width: "100%", marginBottom: "1rem" }}
          renderInput={(params) => (
            <TextField {...params} label="Muscle Group" />
          )}
          onSelect={(event) => {
            filterWorkouts(event.target.value);
          }}
        />

        <Autocomplete
          id="Workout Type"
          options={workoutTypes}
          getOptionLabel={(option) => option}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Workout Type" />
          )}
          onSelect={(event) => {
            filterWorkouts(event.target.value);
          }}
        /> */}
      </Card>

      {/* TODO Add min max duration selections */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "0 auto",
        }}
      >
        {workoutsToShow.map((workout) => (
          <Card
            key={workout.id}
            sx={{
              maxWidth: 345,
              width: "100%",
              margin: "1rem auto",
            }}
          >
            {workout != null ? (
              <CardMedia
                component="img"
                alt="workout video screenshot"
                height="190"
                // image={recommendedWorkout.thumbnail}
                image={workout.thumbnail}
                onClick={() => {
                  window.open(workout.link, "_blank");
                }}
                sx={{
                  cursor: "pointer",
                }}
                href={workout.link}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={345}
                height={190}
                animation="wave"
              />
            )}
            <CardContent
              sx={{
                textAlign: "center",
              }}
            >
              {workout != null ? (
                <>
                  <Typography variant="body1" color="text.secondary">
                    {workout.category}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    color={"black"}
                  >
                    {workout.duration} {workout.name}
                  </Typography>
                </>
              ) : (
                <Skeleton animation="wave" height={10} width="80%" />
              )}
            </CardContent>

            <CardActions
              sx={{
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              {workout != null ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    window.open(workout.link, "_blank");
                  }}
                >
                  Watch
                </Button>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", margin: "0 1rem" }}
                />
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Workouts;
