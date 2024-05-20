import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

const useFetchWorkouts = () => {
  const client = useSupabase();
  const queryKey = ["workouts"];

  const queryFn = async () => {
    console.log("fetching workouts");
    return await client
      .from("workouts")
      .select()
      .then((response) => response.data);
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: 60000, // Data is considered fresh for 1 minute
    cacheTime: 300000, // Data stays in the cache for 5 minutes
  });
};

export default useFetchWorkouts;
