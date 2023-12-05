import { useEffect, useState } from 'react';
import { db } from '../Config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { workoutData } from '../Data/workoutData';

export const useGetWorkoutData = () => {
  const [allWorkoutData, setAllWorkoutData] = useState(workoutData); // Default to local workout data


  useEffect(() => {
      // Check if db contains data, if not use local workout data
    const getWorkoutData = async () => {
      const workoutCollectionRef = collection(db, 'workouts'); // Get all workouts

      let data = {};
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


    getWorkoutData();
  }, []);

  return {allWorkoutData}
};
