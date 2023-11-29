/**
 * @fileoverview Home page for the app. Displays the recommended workout for the day.
 */
import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { workouts, workoutSchedule, workoutScheduleAlt } from "../Data/workoutData";
import WorkoutCard from "../Components/WorkoutCard";

const Home = () => {
  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [warmups, setWarmups] = useState();
  const [recovery, setRecovery] = useState();
  const [stretches, setStretches] = useState();
  const [recommendedWarmup, setRecommendedWarmup] = useState([]);
  const [recommendedRecovery, setRecommendedRecovery] = useState([]);
  const [recommendedStretch, setRecommendedStretch] = useState([]);
  const [currentWorkoutSchedule, setCurrentWorkoutSchedule] = useState(workoutSchedule);
  const [selectedTab, setSelectedTab] = useState(0);



  // On mount, load all workouts, generate today's workouts, and set the recommended workout
  useEffect(() => {

    // Setup Data
    setWarmups(workouts.filter(workout => workout.category.includes("Warm Up")));
    setRecommendedWarmup(workouts.filter(workout => workout.category.includes("Warm Up"))[0]);
    setRecovery(workouts.filter(workout => workout.category.includes("Recovery")));
    setRecommendedRecovery(workouts.filter(workout => workout.category.includes("Recovery"))[0]);
    setStretches(workouts.filter(workout => workout.category.includes("Stretch")));
    setRecommendedStretch(workouts.filter(workout => workout.category.includes("Stretch"))[0]);



    // Generate today's workouts and recommended workout based on schedule
    const generateTodaysWorkouts = (workoutData) => {
      const currentDate = new Date();

        // Filter the workouts based on the current day and schedule
        const workoutList = workoutData.filter(
          (workout) =>
            workout.group.includes(
              // Javascript uses 0-6 for Sunday-Saturday
              currentWorkoutSchedule[currentDate.getDay()].group
            ) &&
            workout.category.includes(
              // Javascript uses 0-6 for Sunday-Saturday
              currentWorkoutSchedule[currentDate.getDay()].category
            )
        );


        // Create a "score" for each workout based on watch count and rating
        workoutList.forEach((workout) => {
          workout.score = workout.rating - workout.watchCount;
        });

        // Sort the workouts by score
        workoutList.sort((a, b) => (a.score > b.score ? -1 : 1));

        // Do the same for the warmups, recovery, and stretches
        const warmupList = workouts.filter(workout => workout.category.includes("Warm Up"));
        const recoveryList = workouts.filter(workout => workout.category.includes("Recovery"));
        const stretchList = workouts.filter(workout => workout.category.includes("Stretch"));

        warmupList.forEach((workout) => {
          workout.score = workout.rating - workout.watchCount;
        }
        );
        warmupList.sort((a, b) => (a.score > b.score ? -1 : 1));

        recoveryList.forEach((workout) => {
          workout.score = workout.rating - workout.watchCount;
        }
        );
        recoveryList.sort((a, b) => (a.score > b.score ? -1 : 1));

        stretchList.forEach((workout) => {
          workout.score = workout.rating - workout.watchCount;
        }
        );
        stretchList.sort((a, b) => (a.score > b.score ? -1 : 1));

        // Set the recommended warmup, recovery, and stretch to the first workout in the list
        setRecommendedWarmup(warmupList[0]);
        setRecommendedRecovery(recoveryList[0]);
        setRecommendedStretch(stretchList[0]);

        setTodaysWorkouts(workoutList);

        // Set the recommended workout to the first workout in the list
        setRecommendedWorkout(workoutList[0]);
      }


     // Generate today's workouts and recommended workout
     generateTodaysWorkouts(workouts);
  }, [todaysWorkouts.length, currentWorkoutSchedule]);


  // Increment the recommended workout
  const incrementRecommendedWorkout = () => {
    const currentWorkoutIndex = todaysWorkouts.indexOf(recommendedWorkout);

    if (currentWorkoutIndex < todaysWorkouts.length - 1) {
      setRecommendedWorkout(todaysWorkouts[currentWorkoutIndex + 1]);
    } else {
      setRecommendedWorkout(todaysWorkouts[0]);
    }
  };

  // Increment the recommended warmup
  const incrementRecommendedWarmup = () => {
    const currentWarmupIndex = warmups.indexOf(recommendedWarmup);

    if (currentWarmupIndex < warmups.length - 1) {
      setRecommendedWarmup(warmups[currentWarmupIndex + 1]);
    } else {
      setRecommendedWarmup(warmups[0]);
    }
  }

  // Increment the recommended recovery
  const incrementRecommendedRecovery = () => {
    const currentRecoveryIndex = recovery.indexOf(recommendedRecovery);

    if (currentRecoveryIndex < recovery.length - 1) {
      setRecommendedRecovery(recovery[currentRecoveryIndex + 1]);
    } else {
      setRecommendedRecovery(recovery[0]);
    }
  }

  // Increment the recommended stretch
  const incrementRecommendedStretch = () => {
    const currentStretchIndex = stretches.indexOf(recommendedStretch);

    if (currentStretchIndex < stretches.length - 1) {
      setRecommendedStretch(stretches[currentStretchIndex + 1]);
    } else {
      setRecommendedStretch(stretches[0]);
    }
  }



  // Toggle between the two workout schedules
  function toggleWorkoutSchedule() {

    // If the current workout schedule is the default schedule, use the alternative schedule
    if (currentWorkoutSchedule === workoutSchedule) {
      setCurrentWorkoutSchedule(workoutScheduleAlt);
    } else {
      // Otherwise, use the default schedule
      setCurrentWorkoutSchedule(workoutSchedule);
    }

    // Store the current workout schedule in local storage
    localStorage.setItem("workoutSchedule", JSON.stringify(currentWorkoutSchedule));
  }

  // Handle tab selection
  const handleTabSelect = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box
        sx={{
          my: 1,
          height: "100%",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabSelect}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{
            width: "100%",
            maxWidth: 540,
            margin: "0 auto",
            backgroundColor: "background.paper",
            borderRadius: "5px",
            paddingBottom: "0.1rem",
          }}
          centered
        >
          <Tab label="Workout" />
          <Tab label="Warmup" />
          <Tab label="Recover" />
          <Tab label="Stretch" />
        </Tabs>

        {selectedTab === 0 && (
          <WorkoutCard
            size="large"
            title="Recommended Workout"
            subtitle="Recommended Workout"
            workout={recommendedWorkout}
            incrementFunction={incrementRecommendedWorkout}
            hasToggle={true}
            toggleFunction={toggleWorkoutSchedule}
            isChecked={currentWorkoutSchedule === workoutScheduleAlt}
          />
        )}

        {selectedTab === 1 && (
          <WorkoutCard
            size="large"
            title="Need a Warmup?"
            subtitle="Recommended Warmup"
            workout={recommendedWarmup}
            incrementFunction={incrementRecommendedWarmup}
          />
        )}

        {selectedTab === 2 && (
          <WorkoutCard
            size="large"
            title="Time to Recover?"
            subtitle="Recommended Recovery"
            workout={recommendedRecovery}
            incrementFunction={incrementRecommendedRecovery}
          />
        )}

        {selectedTab === 3 && (
          <WorkoutCard
            size="large"
            title="Relax and Stretch"
            subtitle="Recommended Stretch"
            workout={recommendedStretch}
            incrementFunction={incrementRecommendedStretch}
          />
        )}

      </Box>
    </>
  );
}

export default Home;
