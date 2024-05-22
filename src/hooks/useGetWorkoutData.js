import { useEffect, useState } from "react";
import useFetchWorkouts from "./useFetchWorkouts";
import useFetchMuscleGroups from "./useFetchMuscleGroups";
import useFetchUserWorkouts from "./useFetchUserWorkouts";
import useUpdateUserWorkouts from "./useUpdateUserWorkouts";
import { useUser } from "./UserContext";


export const useGetWorkoutData = () => {
  // Get the workout data from the database
  const { data: workouts, isLoading, isError } = useFetchWorkouts();

  // Get the muscle group data from the database
  const { data: muscleGroups } = useFetchMuscleGroups();
  const { recoveryMuscleGroups, weightMuscleGroups, stretchMuscleGroups } =
    muscleGroups || {
      recoveryMuscleGroups: [],
      weightMuscleGroups: [],
      stretchMuscleGroups: [],
    };

  // Get user data
  const { user } = useUser();
  const { data: userWorkouts } = useFetchUserWorkouts();
  const updateUserWorkouts = useUpdateUserWorkouts(); // Get the function to update the user workouts

  console.log("User workouts in useGetWorkoutData: ", userWorkouts);

  // Select unique categories from the workouts
  const workoutTypes = workouts
    ? [
        ...new Set(
          workouts
            .map((workout) => workout.category)
            .filter((category) => !category.includes(","))
        ),
      ]
    : [];

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
  const [usingAltSchedule, setUsingAltSchedule] = useState(false);

  /////////////////////////////////////////////////////////////////////
  // Functions
  /////////////////////////////////////////////////////////////////////

  // Handle watching a workout
  const handleWatchWorkout = (workout) => {
    window.open(workout.link, "_blank");

    // If a user is logged in
    if (user && user.id) {
      console.log("user in handleWatchWorkout: ", user);
      // If the workout exists in the user workouts update the count and last watched date
      if (
        userWorkouts &&
        userWorkouts.find(
          (userWorkout) => userWorkout.workout_id === workout.id
        )
      ) {
        console.log("Update the user workout!");
        // Update the user workouts
        updateUserWorkouts.mutate({
          user_id: user.id,
          workout_id: workout.id,
          workout_count:
            userWorkouts.find(
              (userWorkout) => userWorkout.workout_id === workout.id
            ).workout_count + 1,
          workout_last_watched: new Date().toISOString(),
        });
      } else {
        console.log("Add the user workout!");
        // Add the workout to the user workouts
        updateUserWorkouts.mutate({
          user_id: user.id,
          workout_id: workout.id,
          workout_count: 1,
          workout_last_watched: new Date().toISOString(),
        });
      }
    }
  };

  // If the current workout schedule is the default schedule, use the alternative schedule
  const switchCurrentWorkoutSchedule = () => {
    // Compare the current workout schedule to the default schedule - using JSON.stringify otherwise it will compare the objects reference
    if (
      JSON.stringify(currentWorkoutSchedule) === JSON.stringify(workoutSchedule)
    ) {
      setCurrentWorkoutSchedule(workoutScheduleAlt);
      setUsingAltSchedule(true);
    } else {
      setCurrentWorkoutSchedule(workoutSchedule);
      setUsingAltSchedule(false);
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
    // Generate today's workouts and recommended workout based on schedule
    const generateTodaysWorkouts = () => {
      // setWorkouts(data);

      setWarmups(
        workouts.filter((workout) => workout.category.includes("Warm Up"))
      );
      setRecovery(
        workouts.filter((workout) => workout.category.includes("Recovery"))
      );
      setStretches(
        workouts.filter((workout) => workout.category.includes("Stretch"))
      );

      const currentDate = new Date();

      // Filter the workouts based on the current day and schedule
      const workoutList = workouts.filter(
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
        workouts.filter((workout) => workout.category.includes("Warm Up"))[0]
      );
      setRecommendedRecovery(
        workouts.filter((workout) => workout.category.includes("Recovery"))[0]
      );
      setRecommendedStretch(
        workouts.filter((workout) => workout.category.includes("Stretch"))[0]
      );

      setTodaysWorkouts(workoutList);

      // Set the recommended workout to the first workout in the list
      setRecommendedWorkout(workoutList[0]);
    };

    // Generate today's workouts and recommended workout
    if (workouts) {
      generateTodaysWorkouts(workouts);
    }

    // getWorkoutData().then((data) => {
    //   generateTodaysWorkouts(data);
    // });
    // if (cachedWorkoutData) {
    //   console.log("cached!");
    //   generateTodaysWorkouts(cachedWorkoutData);
    // } else {
    //   console.log("grab from db!");
    //   getWorkoutData().then((data) => {
    //     generateTodaysWorkouts(data);
    //   });
    // }
  }, [currentWorkoutSchedule, workouts]);

  const workoutData = {
    isLoading,
    isError,
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
    usingAltSchedule,
    userWorkouts,
    handleWatchWorkout,
  };

  return workoutData;
};
