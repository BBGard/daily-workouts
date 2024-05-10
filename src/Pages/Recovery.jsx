import React from "react";
import { useState, useEffect } from "react";
// import { workouts, recoveryMuscleGroups, sources } from "../Data/workoutData";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import WorkoutCard from "../Components/WorkoutCard";

const Recovery = (props) => {
  // const workouts = props.workoutData.workouts;
  const recoveryMuscleGroups = props.workoutData.recoveryMuscleGroups;
  const recovery = props.workoutData.recovery;

  const [workoutsToShow, setWorkoutsToShow] = useState(recovery); // workouts to show
  const [searchText, setSearchText] = useState([]); // search text
  // const [sourceSelection, setSourceSelection] = useState([]); // muscle groups
  const [muscleGroupsSelection, setMuscleGroupsSelection] = useState([]); // muscle groups
  const [tabSelection, setTabSelection] = useState("All"); // muscle groups

  const muscleGroups = recoveryMuscleGroups.sort();

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

  // Filter the workouts to show based on the selected muscle group and workout type
  const filterWorkouts = () => {
    let filteredWorkouts = recovery; // workouts to show

    // If there is search text, filter workouts by search text
    if (searchText.length > 0) {
      filteredWorkouts = filteredWorkouts.filter((workout) => {
        return (
          workout.name.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.category.toLowerCase().includes(searchText.toLowerCase()) ||
          workout.group.toLowerCase().includes(searchText.toLowerCase())
          // workout.source.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }

    // If no muscle groups or workout types are selected show all workouts
    if (muscleGroupsSelection.length === 0 && searchText.length === 0 ) {
      // setWorkoutsToShow(sortByScore(recovery));
      setWorkoutsToShow(recovery);
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

    // If sources are selected, filter workouts by source
    // if (sourceSelection.length > 0) {
    //   filteredWorkouts = filteredWorkouts.filter((workout) => {
    //     return sourceSelection.some((source) => {
    //       return workout.source.toLowerCase().includes(source.toLowerCase());
    //     });
    //   });
    // }


    // Set the workouts to show
    // setWorkoutsToShow(sortByScore(filteredWorkouts));
    setWorkoutsToShow(filteredWorkouts);
  };

  const handleMuscleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMuscleGroupsSelection(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // const handleSourceChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSourceSelection(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const handleTabClick = (event, newValue) => {
    setTabSelection(newValue);
    if (newValue === "All") {
      setWorkoutsToShow(recovery);
      return;
    }

    // const sortedWorkouts = sortByScore(recovery);
    const sortedWorkouts = recovery;
    setWorkoutsToShow(
      sortedWorkouts.filter((workout) => workout.group.includes(newValue))
    );
  };

  // Sort routines by score on each load
  useEffect(() => {

    // set the workouts to show
    // setWorkoutsToShow(sortByScore(recovery));
    setWorkoutsToShow(recovery);
  }, [recovery]);

  // Function to sort workouts by score
  // const sortByScore = (workoutList) => {
  //   const recoveryList = workoutList.filter(
  //     (workout) => workout.category.includes("Recovery")
  //   );
  //   recoveryList.forEach((workout) => {
  //     workout.score = workout.rating - workout.watchCount;
  //   });

  //   // sort the workouts by score
  //   recoveryList.sort((a, b) => (a.score > b.score ? -1 : 1));

  //   return recoveryList;
  // };

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        color={"text.tertiary"}
        textAlign={"center"}
        gutterBottom
      >
        Mobility & Recovery
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

        {/* <FormControl
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
        </FormControl> */}

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
              setSearchText("");
              setWorkoutsToShow(recovery);
              setTabSelection("All");
              // setSourceSelection([]);
            }}
            width="100%"
          >
            Clear
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
        <Tabs
          value={tabSelection}
          onChange={handleTabClick}
          variant="scrollable"
          // variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          scrollButtons="auto"
          aria-label="muscle group tabs"
          sx={{ justifyContent: "center" }}
        >
          <Tab key="All" label="All" value="All" sx={{ fontWeight: "bold" }} />
          {muscleGroups.map((group) => (
            <Tab
              key={group}
              label={group}
              value={group}
              sx={{ fontWeight: "bold" }}
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
          workoutsToShow.map((routine) => (
            <WorkoutCard key={routine.id} workout={routine} size="small" />
          ))
        ) : (
          <WorkoutCard type="missing" />
        )}
      </Box>
    </Box>
  );
};

export default Recovery;
