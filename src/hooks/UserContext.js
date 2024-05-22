import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import useSupabase from './useSupabase';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const client = useSupabase();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sign out function
  const signOut = async () => {
    const { error } = await client.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("User logged out successfully!");
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await client.auth.getSession();
        if (error) throw error;
        setSession(session);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [client]);

  const user = useMemo(() => {
    if (!session) {
      return {
        name: null,
        photo: null,
        email: null,
        id: null,
        token: null,
      };
    } else {
      return {
        name: session.user?.user_metadata?.full_name || null,
        photo: session.user?.user_metadata?.avatar_url || null,
        email: session.user?.email || null,
        id: session.user?.id || null,
        token: session.access_token || null,
      };
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, signOut, error, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
