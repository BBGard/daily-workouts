 /* Custom hook to get user info from cookies
 * @returns {object} userInfo
 */
import { useState, useEffect, useMemo } from "react";
// import { supabase } from "../Config/supabase.config";
import useSupabase from "./useSupabase";

export const useGetUserInfo = () => {
  const client = useSupabase();
  const [session, setSession] = useState(null); // Initialize session state

  // Fetch session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: session } = await client.auth.getSession(); // Get session data
        setSession(session); // Set session state

        console.log("Heres the session: ", session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();

    // Subscribe to session changes
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Unsubscribe from session
    return () => subscription.unsubscribe();
  }, []);

  // Memoize user data
  const user = useMemo(() => {
    if (!session) {
      return {
        name: null,
        photo: null,
        email: null,
        token: null,
      };
    } else {
      return {
        name: session.user?.user_metadata?.full_name || null,
        photo: session.user?.user_metadata?.avatar_url || null,
        email: session.user?.email || null,
        token: session.access_token || null,
      };
    }
  }, [session]);

  // Return user data
  return { user };
};
