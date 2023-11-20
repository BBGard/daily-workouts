import React, { useEffect } from "react";
import {
  workouts,
  weightMuscleGroups,
  workoutTypes,
} from "../Data/workoutData";
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  Tab,
  Tabs,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import WorkoutCard from "../Components/WorkoutCard";

const Workouts = () => {
  const [allWorkouts] = useState(workouts); // all workouts
  const [workoutsToShow, setWorkoutsToShow] = useState(workouts); // workouts to show
  const [searchText, setSearchText] = useState([]); // search text
  const [muscleGroupsSelection, setMuscleGroupsSelection] = useState([]); // muscle groups
  const [workoutTypesSelection, setWorkoutTypesSelection] = useState([]); // workout types
  const [muscleGroupTabSelection, setMuscleGroupTabSelection] = useState("All"); // muscle groups

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
  const muscleGroups = weightMuscleGroups.sort();

  // Filter the workouts to show based on the selected muscle group and workout type
  const filterWorkouts = () => {
    let filteredWorkouts; // workouts to show

    // If there is search text, filter workouts by search text
    if (searchText.length > 0) {
      filteredWorkouts = allWorkouts.filter((workout) => {
        return (
          workout.name.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.category.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.group.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    // If no muscle groups or workout types are selected show all workouts
    if (
      muscleGroupsSelection.length === 0 &&
      workoutTypesSelection.length === 0 &&
      searchText.length === 0
    ) {
      setWorkoutsToShow(allWorkouts);
      return;
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
      if (filteredWorkouts === undefined) {
        filteredWorkouts = allWorkouts.filter((workout) => {
          return workoutTypesSelection.some((workoutType) => {
            return workout.category.includes(workoutType);
          });
        });
      } else {
        filteredWorkouts = filteredWorkouts.filter((workout) => {
          return workoutTypesSelection.some((workoutType) => {
            return workout.category.includes(workoutType);
          });
        });
      }
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
  };

  const handleMuscleGroupTabClick = (event, newValue) => {
    setMuscleGroupTabSelection(newValue);
    if (newValue === "All") {
      setWorkoutsToShow(workouts);
      return;
    }

    setWorkoutsToShow(
      workouts.filter((workout) => workout.group.includes(newValue))
    );
  };

  // sort routines by score on each load
  useEffect(() => {
    // calculate a score for each workout based on watch count and rating
    const workoutList = workouts;
    workoutList.forEach((workout) => {
      workout.score = workout.rating - workout.watchCount;
    });

    // sort the workouts by score
    workoutList.sort((a, b) => (a.score > b.score ? -1 : 1));

    // set the workouts to show
    setWorkoutsToShow(workoutList);
  }, []);


  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        textAlign={"center"}
        gutterBottom
        color={"text.tertiary"}
      >
        All Workouts
      </Typography>

      <Card sx={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
        <Typography
          variant="h6"
          component="h6"
          color={"text.primary"}
          textAlign={"left"}
          gutterBottom
        >
          Find a Workout
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

        <FormControl
          label="Muscle Group"
          variant="outlined"
          sx={{ marginTop: "1rem", width: "100%" }}
        >
          <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
          <Select
            labelId="muscle-group-label"
            id="muscle-group-checkbox"
            multiple
            value={muscleGroupsSelection}
            onChange={handleMuscleChange}
            input={<OutlinedInput label={"Muscle Group"} />}
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
        <FormControl sx={{ marginTop: "1rem", width: "100%" }}>
          <InputLabel id="workout-type-label">Workout Type</InputLabel>
          <Select
            labelId="workout-type-label"
            id="workout-type-checkbox"
            multiple
            value={workoutTypesSelection}
            onChange={handleWorkoutTypeChange}
            input={<OutlinedInput label={"Workout Type"} />}
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
              setMuscleGroupsSelection([]);
              setWorkoutTypesSelection([]);
              setSearchText("");
              setWorkoutsToShow(allWorkouts);
              setMuscleGroupTabSelection("All");
            }}
          >
            Clear
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
        <Tabs
          value={muscleGroupTabSelection}
          onChange={handleMuscleGroupTabClick}
          variant="scrollable"
          // variant="fullWidth"
          scrollButtons="auto"
          aria-label="muscle group tabs"
          sx={{ justifyContent: "center" }}
        >
          <Tab key="All" label="All" value="All" />
          {muscleGroups.map((type) => (
            <Tab key={type} label={type} value={type} />
          ))}
        </Tabs>
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
        {workoutsToShow.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} size="small" />
        ))}
      </Box>
    </Box>
  );
};

export default Workouts;
