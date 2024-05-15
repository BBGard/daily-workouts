import { useMemo } from "react";
import { supabase } from "../Config/supabase.config";

/**
 * Custom hook to return the Supabase client object
 * uses useMemo to memoize the value so that it doesn't change on every render
 * @returns {Object} Supabase client object
 */

const useSupabase = () => {
  return useMemo(() => supabase, []);
}

export default useSupabase;
