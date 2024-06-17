import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

export async function updateUserWorkoutsByUserId(
  client, data
) {
  return await client
    .from("user_workouts")
    .update(data)
    .match({ user_id: data.user_id })
    .then((response) => response.data);



}

const useUpdateUserWorkouts = () => {
  const client = useSupabase();
  console.log("Inside useUpdateUserWorkouts hook");

  const mutationFn = async (data) => {
    return updateUserWorkoutsByUserId(client, data).then(
      (response) => response.data
    );



    // return await client
    //   .from("user_workouts")
    //   .update(data)
    //   .match({ id: data.id })
    //   .then((response) => response.data);
  };

  return useMutation(mutationFn);
};

export default useUpdateUserWorkouts;
