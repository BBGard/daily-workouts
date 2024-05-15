import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

const useWorkoutQuery = () => {
  const client = useSupabase();
  const queryKey = ["workouts"];

  const queryFn = async () => {
    console.log("fething workouts");
    return await client.from("workouts").select().then((response) => response.data);
  };

  return useQuery({queryKey, queryFn});
}

export default useWorkoutQuery;
