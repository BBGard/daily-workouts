/**
 * @fileoverview Home page for the app. Displays the recommended workout for the day.
 */
import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
// import { workouts, workoutSchedule, workoutScheduleAlt } from "../Data/workoutData";
// import { workoutSchedule, workoutScheduleAlt } from "../Data/workoutData";
import WorkoutCard from "../Components/WorkoutCard";
import { useGetWorkoutData } from "../hooks/useGetWorkoutData";


const Home = () => {
  // Pick a random workout from the workout schedule
  // const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  // const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  // const [warmups, setWarmups] = useState();
  // const [recovery, setRecovery] = useState();
  // const [stretches, setStretches] = useState();
  // const [recommendedWarmup, setRecommendedWarmup] = useState([]);
  // const [recommendedRecovery, setRecommendedRecovery] = useState([]);
  // const [recommendedStretch, setRecommendedStretch] = useState([]);
  // const [currentWorkoutSchedule, setCurrentWorkoutSchedule] = useState(workoutSchedule);
  const [selectedTab, setSelectedTab] = useState(0);


  // Console log user details
  const {
    allWorkoutData,
    recommendedWorkout,
    recommendedWarmup,
    recommendedRecovery,
    recommendedStretch,
    currentWorkoutSchedule,
    switchCurrentWorkoutSchedule,
    incrementRecommendedWorkout,
    incrementRecommendedWarmup,
    incrementRecommendedRecovery,
    incrementRecommendedStretch,
    workoutScheduleAlt,
  } = useGetWorkoutData();








  // Toggle between the two workout schedules
  function toggleWorkoutSchedule() {
    switchCurrentWorkoutSchedule();
  }

  // Handle tab selection
  const handleTabSelect = (event, newValue) => {
    setSelectedTab(newValue);
  };


  return (
    <>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabSelect}
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{
            width: "100%",
            maxWidth: 540,
            margin: "0 auto",
          }}
          centered
        >
          <Tab label="Workout" sx={{ fontWeight: "600" }} />
          <Tab label="Warmup" sx={{ fontWeight: "600" }} />
          <Tab label="Recover" sx={{ fontWeight: "600" }} />
          <Tab label="Stretch" sx={{ fontWeight: "600" }} />
        </Tabs>
        <Divider />

        {selectedTab === 0 && (
          <WorkoutCard
            size="large"
            title="Recommended Workout"
            workout={recommendedWorkout}
            incrementFunction={incrementRecommendedWorkout}
            hasToggle={true}
            toggleFunction={toggleWorkoutSchedule}
            // isChecked={currentWorkoutSchedule === workoutScheduleAlt}
            isChecked={currentWorkoutSchedule === workoutScheduleAlt}
          />
        )}

        {selectedTab === 1 && (
          <WorkoutCard
            size="large"
            title="Need a Warmup?"
            workout={recommendedWarmup}
            incrementFunction={incrementRecommendedWarmup}
          />
        )}

        {selectedTab === 2 && (
          <WorkoutCard
            size="large"
            title="Time to Recover?"
            workout={recommendedRecovery}
            incrementFunction={incrementRecommendedRecovery}
          />
        )}

        {selectedTab === 3 && (
          <WorkoutCard
            size="large"
            title="Relax and Stretch"
            workout={recommendedStretch}
            incrementFunction={incrementRecommendedStretch}
          />
        )}
      </Box>
    </>
  );
}

export default Home;
