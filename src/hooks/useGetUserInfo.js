/**
 * Custom hook to get user info from cookies
 * @returns {object} userInfo
 */

// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useState, useEffect } from "react";
import { supabase } from "../Config/supabase.config";

export const useGetUserInfo = () => {
  // console.log("get user info");

  const [session, setSession] = useState(null);
  let user = {};

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    user = {
      name: null,
      photo: null,
      email: null,
      token: null,
    };
    return { user };
  } else {
    // console.log("Session found!");
    // console.log(session);

    user = {
      name: session.user.user_metadata.full_name,
      photo: session.user.user_metadata.avatar_url,
      email: session.user.email,
      token: session.access_token,
    };

    // console.log("User: ", user);

    return { user };
  }

  // if(document.cookie.includes('user')) {
  //   console.log("user found in cookies");
  //   user = JSON.parse(document.cookie.split(';')[0].slice(5));
  // } else {
  //   console.log("user not found in cookies");
  //   user = {
  //     name: null,
  //     photo: null,
  //     email: null,
  //     token: null,
  //   };
  // }

  // return {user};
};
