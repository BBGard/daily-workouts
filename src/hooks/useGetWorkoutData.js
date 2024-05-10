import { useEffect, useState } from "react";
import { supabase } from "../Config/supabase.config";
// import { workoutSchedule, workoutScheduleAlt } from "../Data/workoutData";

async function getAllWorkoutData() {
  const { data, error } = await supabase.from("workouts").select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export const useGetWorkoutData = () => {
  /////////////////////////////////////////////////////////////////////
  // Workout variables
  /////////////////////////////////////////////////////////////////////
  const workoutTypes = ["Weights", "Recovery", "Warm Up", "Stretch"];

  // Recovery Muscle Groups
  const recoveryMuscleGroups = [
    "Full Body",
    "Back",
    "Shoulders",
    "Knee",
    "Hip",
    "Foot",
    "Heel",
    "Pelvis",
    "Sciatica",
    "Posture",
  ];

  // Workout Muscle Groups
  const weightMuscleGroups = [
    "Full Body",
    "Legs",
    "Glutes",
    "Chest",
    "Triceps",
    "Back",
    "Biceps",
    "Arms",
    "Shoulders",
    "Abs",
  ];

  // Stretch Muscle Groups
  const stretchMuscleGroups = [
    "Full Body",
    "Back",
    "Neck",
    "Shoulders",
    "Legs",
    "Hip",
    "Posture",
    "Face",
  ];
  // Initialize workoutSchedule - note: Sunday is index 0
  const workoutSchedule = [
    {
      day: "Sunday",
      group: "Full Body",
      category: "Recovery",
    },
    {
      day: "Monday",
      group: "Legs",
      category: "Weights",
    },
    {
      day: "Tuesday",
      group: "Chest",
      category: "Weights",
    },
    {
      day: "Wednesday",
      group: "Back",
      category: "Weights",
    },
    {
      day: "Thursday",
      group: "Shoulders",
      category: "Weights",
    },
    {
      day: "Friday",
      group: "Arms",
      category: "Weights",
    },
    {
      day: "Saturday",
      group: "Abs",
      category: "Weights",
    },
  ];

  // Alternative workoutSchedule - full body followed by recovery
  const workoutScheduleAlt = [
    {
      day: "Sunday",
      group: "Full Body",
      category: "Recovery",
    },
    {
      day: "Monday",
      group: "Full Body",
      category: "Weights",
    },
    {
      day: "Tuesday",
      group: "Full Body",
      category: "Weights",
    },
    {
      day: "Wednesday",
      group: "Full Body",
      category: "Recovery",
    },
    {
      day: "Thursday",
      group: "Full Body",
      category: "Weights",
    },
    {
      day: "Friday",
      group: "Full Body",
      category: "Weights",
    },
    {
      day: "Saturday",
      group: "Full Body",
      category: "Weights",
    },
  ];

  /////////////////////////////////////////////////////////////////////
  // State variables
  /////////////////////////////////////////////////////////////////////
  const [cachedWorkoutData, setCachedWorkoutData] = useState(null);
  const [workouts, setWorkouts] = useState([]); // allWorkouts
  const [warmups, setWarmups] = useState();
  const [recovery, setRecovery] = useState();
  const [stretches, setStretches] = useState();
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [recommendedWarmup, setRecommendedWarmup] = useState([]);
  const [recommendedRecovery, setRecommendedRecovery] = useState([]);
  const [recommendedStretch, setRecommendedStretch] = useState([]);
  const [currentWorkoutSchedule, setCurrentWorkoutSchedule] =
    useState(workoutSchedule);

  /////////////////////////////////////////////////////////////////////
  // Functions
  /////////////////////////////////////////////////////////////////////

  // If the current workout schedule is the default schedule, use the alternative schedule
  const switchCurrentWorkoutSchedule = () => {
    if (currentWorkoutSchedule === workoutSchedule) {
      setCurrentWorkoutSchedule(workoutScheduleAlt);
    } else {
      // Otherwise, use the default schedule

      setCurrentWorkoutSchedule(workoutSchedule);
    }
  };

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
  };

  // Increment the recommended recovery
  const incrementRecommendedRecovery = () => {
    const currentRecoveryIndex = recovery.indexOf(recommendedRecovery);

    if (currentRecoveryIndex < recovery.length - 1) {
      setRecommendedRecovery(recovery[currentRecoveryIndex + 1]);
    } else {
      setRecommendedRecovery(recovery[0]);
    }
  };

  // Increment the recommended stretch
  const incrementRecommendedStretch = () => {
    const currentStretchIndex = stretches.indexOf(recommendedStretch);

    if (currentStretchIndex < stretches.length - 1) {
      setRecommendedStretch(stretches[currentStretchIndex + 1]);
    } else {
      setRecommendedStretch(stretches[0]);
    }
  };

  /////////////////////////////////////////////////////////////////////
  // React useEffect
  /////////////////////////////////////////////////////////////////////
  // On mount, load all workouts, generate today's workouts, and set the recommended workout
  useEffect(() => {
    // Get all workout data from the database
    const getWorkoutData = async () => {
      const data = await getAllWorkoutData();
      setCachedWorkoutData(data);
      setWarmups(
        data.filter((workout) => workout.category.includes("Warm Up"))
      );
      setRecovery(
        data.filter((workout) => workout.category.includes("Recovery"))
      );
      setStretches(
        data.filter((workout) => workout.category.includes("Stretch"))
      );
      return data;
    };

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
      // workoutList.forEach((workout) => {
      //   workout.score = workout.rating - workout.watchCount;
      // });

      // Sort the workouts by score
      // workoutList.sort((a, b) => (a.score > b.score ? -1 : 1));

      // Do the same for the warmups, recovery, and stretches
      // const warmupList = workouts.filter(workout => workout.category.includes("Warm Up"));
      // const recoveryList = workouts.filter(workout => workout.category.includes("Recovery"));
      // const stretchList = workouts.filter(workout => workout.category.includes("Stretch"));

      // warmupList.forEach((workout) => {
      //   workout.score = workout.rating - workout.watchCount;
      // }
      // );
      // warmupList.sort((a, b) => (a.score > b.score ? -1 : 1));

      // recoveryList.forEach((workout) => {
      //   workout.score = workout.rating - workout.watchCount;
      // }
      // );
      // recoveryList.sort((a, b) => (a.score > b.score ? -1 : 1));

      // stretchList.forEach((workout) => {
      //   workout.score = workout.rating - workout.watchCount;
      // }
      // );
      // stretchList.sort((a, b) => (a.score > b.score ? -1 : 1));

      // Set the recommended warmup, recovery, and stretch to the first workout in the list
      // setRecommendedWarmup(warmupList[0]);
      // setRecommendedRecovery(recoveryList[0]);
      // setRecommendedStretch(stretchList[0]);
      setRecommendedWarmup(
        workoutData.filter((workout) => workout.category.includes("Warm Up"))[0]
      );
      setRecommendedRecovery(
        workoutData.filter((workout) =>
          workout.category.includes("Recovery")
        )[0]
      );
      setRecommendedStretch(
        workoutData.filter((workout) => workout.category.includes("Stretch"))[0]
      );

      setTodaysWorkouts(workoutList);

      // Set the recommended workout to the first workout in the list
      setRecommendedWorkout(workoutList[0]);
    };

    // Generate today's workouts and recommended workout
    // getWorkoutData().then((data) => {
    //   generateTodaysWorkouts(data);
    // });
    if (cachedWorkoutData) {
      console.log("cached!");
      generateTodaysWorkouts(cachedWorkoutData);
    } else {
      console.log("grab from db!");
      getWorkoutData().then((data) => {
        generateTodaysWorkouts(data);
      });
    }
  }, [currentWorkoutSchedule, cachedWorkoutData]);

  const workoutData = {
    recommendedWorkout,
    todaysWorkouts,
    warmups,
    recovery,
    stretches,
    recommendedWarmup,
    recommendedRecovery,
    recommendedStretch,
    currentWorkoutSchedule,
    workoutScheduleAlt,
    workouts,
    recoveryMuscleGroups,
    weightMuscleGroups,
    stretchMuscleGroups,
    workoutTypes,
    incrementRecommendedRecovery,
    incrementRecommendedStretch,
    incrementRecommendedWarmup,
    switchCurrentWorkoutSchedule,
    incrementRecommendedWorkout,
  };

  return workoutData;
};
