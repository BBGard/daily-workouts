import { useQuery } from '@tanstack/react-query';
import useSupabase from './useSupabase';

const useFetchMuscleGroups = () => {
  const client = useSupabase();
  const queryKey = ['muscle_groups']; // Unique key for the query

  // Function to fetch muscle groups from the database
  const queryFn = async () => {

    const recoveryPromise = client.from('recovery_muscle_groups').select();
    const stretchPromise = client.from('stretch_muscle_groups').select();
    const weightPromise = client.from('weight_muscle_groups').select();

    // Wait for all promises to resolve
    const [recoveryResponse, stretchResponse, weightResponse] = await Promise.all([
      recoveryPromise,
      stretchPromise,
      weightPromise,
    ]);

    if (recoveryResponse.error) throw new Error(recoveryResponse.error.message);
    if (stretchResponse.error) throw new Error(stretchResponse.error.message);
    if (weightResponse.error) throw new Error(weightResponse.error.message);


    // Return the data
    return {
      recoveryMuscleGroups: recoveryResponse.data,
      stretchMuscleGroups: stretchResponse.data,
      weightMuscleGroups: weightResponse.data,
    };
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: 300000, // Data is considered fresh for 5 minutes
    cacheTime: 600000, // Data stays in the cache for 10 minutes
  });
};

export default useFetchMuscleGroups;
