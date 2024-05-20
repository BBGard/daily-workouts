/**
 * @fileoverview Home page for the app. Displays the recommended workout for the day.
 */
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import WorkoutCard from "../Components/WorkoutCard";
import { useGetWorkoutData } from "../hooks/useGetWorkoutData";


const Home = () => {
 const [selectedTab, setSelectedTab] = useState(0); // 0: Workout, 1: Warmup, 2: Recovery, 3: Stretch
  const workoutData = useGetWorkoutData();



  // Function to toggle between the two workout schedules
  function toggleWorkoutSchedule() {
    workoutData.switchCurrentWorkoutSchedule();
  }

  // Function to handle tab selection
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
            workout={workoutData.recommendedWorkout}
            incrementFunction={workoutData.incrementRecommendedWorkout}
            hasToggle={true}
            toggleFunction={toggleWorkoutSchedule}
            isChecked={workoutData.usingAltSchedule}
          />
        )}


        {selectedTab === 1 && (
          <WorkoutCard
            size="large"
            title="Need a Warmup?"
            workout={workoutData.recommendedWarmup}
            incrementFunction={workoutData.incrementRecommendedWarmup}
          />
        )}

        {selectedTab === 2 && (
          <WorkoutCard
            size="large"
            title="Time to Recover?"
            workout={workoutData.recommendedRecovery}
            incrementFunction={workoutData.incrementRecommendedRecovery}
          />
        )}

        {selectedTab === 3 && (
          <WorkoutCard
            size="large"
            title="Relax and Stretch"
            workout={workoutData.recommendedStretch}
            incrementFunction={workoutData.incrementRecommendedStretch}
          />
        )}


      </Box>
    </>
  );
}

export default Home;
