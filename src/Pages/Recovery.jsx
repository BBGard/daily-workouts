import React from 'react';
import { useState } from 'react';
import { workouts, recoveryMuscleGroups } from '../Data/workoutData';
import {  Typography, Box, Button, Card, CardActions, TextField,  CardMedia, Skeleton, Tab, Tabs, CardContent, OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const Recovery = () => {
  // Select only recovery routines from workout data
  const recovery = workouts.filter(
    (workout) => workout.category === "Recovery"
  );

  const [workoutsToShow, setWorkoutsToShow] = useState(workouts.filter((workout) => workout.category === "Recovery")); // workouts to show
const [searchText, setSearchText] = useState([]); // search text
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

  let filteredWorkouts; // workouts to show

  // If there is search text, filter workouts by search text
  if (searchText.length > 0) {

    filteredWorkouts = recovery.filter((workout) => {
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
    searchText.length === 0
  ) {
    setWorkoutsToShow(recovery);
    return;
  }

  // If muscle groups are selected, filter workouts by muscle group
  if (muscleGroupsSelection.length > 0) {
    filteredWorkouts = recovery.filter((workout) => {
      return muscleGroupsSelection.some((muscleGroup) => {
        return workout.group.includes(muscleGroup);
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
    // On autofill we get a stringified value.
    typeof value === "string" ? value.split(",") : value
  );
};

const handleTabClick = (event, newValue) => {
  setTabSelection(newValue);
  if (newValue === "All") {
    setWorkoutsToShow(recovery);
    return;
  }
  setWorkoutsToShow(recovery.filter((workout) => workout.group.includes(newValue)));
}

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
            sx={{color: "text.primary"}}
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
        <CardActions
          sx={{ justifyContent: "center", gap: "1rem", marginTop: "1rem" }}
        >
          <Button variant="contained" color="buttonSuccess" onClick={filterWorkouts}>
            Filter
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setMuscleGroupsSelection([]);
              setSearchText("");
              setWorkoutsToShow(recovery);
              setTabSelection("All");
            }}
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
        scrollButtons="auto"
        aria-label="muscle group tabs"
        sx={{ justifyContent: "center" }}
      >
        <Tab key="All" label="All" value="All" />
        {muscleGroups.map((group) => (
          <Tab key={group} label={group} value={group} />
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
        {workoutsToShow.map((routine) => (
          <Card
            key={routine.id}
            sx={{
              maxWidth: 345,
              width: "100%",
              margin: "1rem auto",
            }}
          >
            {routine != null ? (
              <CardMedia
                component="img"
                alt="routine video screenshot"
                height="190"
                image={routine.thumbnail}
                onClick={() => {
                  window.open(routine.link, "_blank");
                }}
                sx={{
                  cursor: "pointer",
                }}
                href={routine.link}
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
              {routine != null ? (
                <>
                  <Typography variant="body1" color="text.secondary">
                    {routine.category}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    color={"text.primary"}
                  >
                    {routine.duration} {routine.name}
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
              {routine != null ? (
                <Button
                  variant="contained"
                  color="buttonSuccess"
                  onClick={() => {
                    window.open(routine.link, "_blank");
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

export default Recovery;
