// import { useQuery } from "@tanstack/react-query";
// import useSupabase from "./useSupabase";
// import { useUser } from "./UserContext";

// const useFetchUserWorkouts = () => {
//   const client = useSupabase();
//   const queryKey = ["user_workouts"];
//   const { user } = useUser();

//   // console.log("User in useFetchUserWorkouts", user);

//   const queryFn = async () => {
//     return await client
//       .from("user_workouts")
//       .select()
//       .eq('user_id', user.id)
//       .then((response) => response.data);
//   };

//   return useQuery({
//     queryKey,
//     queryFn,
//     staleTime: 300000, // Data is considered fresh for 5 minutes
//     cacheTime: 600000, // Data stays in the cache for 10 minutes
//   });
// };

// export default useFetchUserWorkouts;

import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

const useFetchUserWorkouts = (userId) => {
  const client = useSupabase();
  const queryKey = ["user_workouts", userId];

  const queryFn = async () => {
    if (!userId) return null;
    return await client
      .from("user_workouts")
      .select()
      .eq("user_id", userId)
      .then((response) => response.data);
  };

  const {
    data: userWorkouts,
    isLoading,
    isError,
    refetch
  } = useQuery({
        queryKey,
        queryFn,
        staleTime: 300000, // Data is considered fresh for 5 minutes
        cacheTime: 600000, // Data stays in the cache for 10 minutes
      });

  return {
    userWorkouts,
    isLoading,
    isError,
    refetch
  };
};

export default useFetchUserWorkouts;
