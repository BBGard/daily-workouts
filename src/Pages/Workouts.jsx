import React, { useEffect } from "react";
import {
  workouts,
  weightMuscleGroups,
  workoutTypes,
  sources,
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
  const [workoutsToShow, setWorkoutsToShow] = useState(workouts); // workouts to show
  const [searchText, setSearchText] = useState([]); // search text
  const [muscleGroupsSelection, setMuscleGroupsSelection] = useState([]); // muscle groups
  const [workoutTypesSelection, setWorkoutTypesSelection] = useState([]); // workout types
  const [sourceSelection, setSourceSelection] = useState([]); // muscle groups
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
    let filteredWorkouts = workouts; // workouts to show

    // If there is search text, filter workouts by search text
    if (searchText.length > 0) {
      filteredWorkouts = filteredWorkouts.filter((workout) => {
        return (
          workout.name.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.category.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.group.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.source.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    // If no muscle groups or workout types are selected show all workouts
    if (
      muscleGroupsSelection.length === 0 &&
      workoutTypesSelection.length === 0 &&
      searchText.length === 0 &&
      sourceSelection.length === 0
    ) {
      setWorkoutsToShow(sortByScore(workouts));
      return;
    }

    // If muscle groups are selected, filter workouts by muscle group
    if (muscleGroupsSelection.length > 0) {
      filteredWorkouts = filteredWorkouts.filter((workout) => {
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

     // If sources are selected, filter workouts by source
     if (sourceSelection.length > 0) {
      filteredWorkouts = filteredWorkouts.filter((workout) => {
        return sourceSelection.some((source) => {
          return workout.source.toLowerCase().includes(source.toLowerCase());
        });
      });
    }

    // Set the workouts to show
    setWorkoutsToShow(sortByScore(filteredWorkouts));
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

  const handleSourceChange = (event) => {
    const {
      target: { value },
    } = event;
    setSourceSelection(
      // On autofill we get a stringified value.
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

    const sortedWorkouts = sortByScore(workouts);
    setWorkoutsToShow(
      sortedWorkouts.filter((workout) => workout.group.includes(newValue))
    );
  };

  // sort routines by score on each load
  useEffect(() => {
    // set the workouts to show
    setWorkoutsToShow(sortByScore(workouts));
  }, []);

  // Function to sort workouts by score
  const sortByScore = (workoutList) => {
    const fullList = workoutList.filter(
      (workout) =>
        workout.category.includes("Recovery") ||
        workout.category.includes("Stretch") ||
        workout.category.includes("Warm Up") ||
        workout.category.includes("Weights")
    );
    fullList.forEach((workout) => {
      workout.score = workout.rating - workout.watchCount;
    });

    // sort the workouts by score
    fullList.sort((a, b) => (a.score > b.score ? -1 : 1));

    return fullList;
  };


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
            name="keyword-search"
            label="Type here to search"
            variant="outlined"
            sx={{ color: "text.primary" }}
            value={searchText}
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
            name="muscle-group-checkbox"
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
            name="workout-type-checkbox"
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

        <FormControl
          label="Source"
          variant="outlined"
          sx={{ marginTop: "1rem", width: "100%" }}
        >
          <InputLabel id="source-label">Source</InputLabel>
          <Select
            labelId="source-label"
            id="source-checkbox"
            multiple
            value={sourceSelection}
            onChange={handleSourceChange}
            input={<OutlinedInput label={"Source"} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {sources.map((source) => (
              <MenuItem key={source} value={source}>
                <Checkbox checked={sourceSelection.indexOf(source) > -1} />
                <ListItemText primary={source} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CardActions
          sx={{ justifyContent: "center", gap: "1rem", marginTop: "1rem" }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={filterWorkouts}
            width="100%"
          >
            Filter
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setMuscleGroupsSelection([]);
              setWorkoutTypesSelection([]);
              setSearchText("");
              setWorkoutsToShow(workouts);
              setMuscleGroupTabSelection("All");
              setSourceSelection([]);
            }}
            width="100%"
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
          indicatorColor="secondary"
          textColor="secondary"
          // variant="fullWidth"
          scrollButtons="auto"
          aria-label="muscle group tabs"
          sx={{ justifyContent: "center" }}
        >
          <Tab key="All" label="All" value="All" sx={{ fontWeight: "bold" }} />
          {muscleGroups.map((type) => (
            <Tab
              key={type}
              label={type}
              value={type}
              sx={{ fontWeight: "bold", }}
            />
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
        {workoutsToShow && workoutsToShow.length > 0 ? (
          workoutsToShow.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} size="small" />
          ))
        ) : (
          <WorkoutCard type="missing" />
        )}
      </Box>
    </Box>
  );
};

export default Workouts;
