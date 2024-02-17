import { useEffect, useState } from 'react';
import { db } from '../Config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export const useGetWorkoutData = () => {
  const [allWorkoutData, setAllWorkoutData] = useState();


  useEffect(() => {
    const getWorkoutData = async () => {
      const workoutCollectionRef = collection(db, 'workouts'); // Get all workouts

      let data = {};
      let unsubscribe; // Unsubscribe from db when component unmounts

      try {
        console.log("pulling data");
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

          // Cache data in local storage with a 1 hour expiration
          const now = new Date();
          const item = {
            data: data,
            timestamp: now.getTime(),
            expiration: now.getTime() + 3600000,
          };
          localStorage.setItem('workouts', JSON.stringify(item));
        });


        // console.log('Workout data retrieved from db');
        // console.log(allWorkoutData);


      } catch (error) {
        console.error(error);
      }

      // Return unsubscribe function to prevent memory leaks
      return () => unsubscribe();
    };

    // Check if data is cached in local storage, if not pull from db
    const cachedWorkoutData = localStorage.getItem('workouts');
    if (cachedWorkoutData) {
      console.log("cached data found!");

      const now = new Date();
      const cachedData = JSON.parse(cachedWorkoutData);

      // Check if cached data is expired
      if (now.getTime() > cachedData.expiration) {
        console.log("cached data expired");
        localStorage.removeItem('workouts');
        getWorkoutData();
        return;
      }

      // Set data from cache
      setAllWorkoutData(JSON.parse(cachedWorkoutData));
      return;
    }


    getWorkoutData();
  }, []);

  return {allWorkoutData}
};
