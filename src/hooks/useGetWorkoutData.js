import { useEffect, useState } from 'react';
import { db } from '../Config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { workoutData } from '../Data/workoutData';

export const useGetWorkoutData = () => {
  const [allWorkoutData, setAllWorkoutData] = useState(workoutData); // Default to local workout data
  const workoutCollectionRef = collection(db, 'workouts'); // Get all workouts
  // Check if db contains data, if not use local workout data
  const getWorkoutData = async () => {
    let data = {};

    // Get all workouts from db
    let unsubscribe; // Unsubscribe from db when component unmounts

    try {
      const queryWorkouts = query(workoutCollectionRef);

      // Subscribe to db
      unsubscribe = onSnapshot(queryWorkouts, (snapshot) => {
        const workouts = [];
        snapshot.forEach((doc) => {
          workouts.push(doc.data());
        });

        // Add workouts array to data object
        data = { workouts };
        setAllWorkoutData(data);
      });

      // console.log('Workout data retrieved from db');
      // console.log(allWorkoutData);


    } catch (error) {
      console.error(error);
    }

    // Return unsubscribe function to prevent memory leaks
    return () => unsubscribe();
  };

  useEffect(() => {
    getWorkoutData();
  }, []);

  return {allWorkoutData}
};
