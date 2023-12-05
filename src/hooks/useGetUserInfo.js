/**
 * Custom hook to get user info from cookies
 * @returns {object} userInfo
 */
export const useGetUserInfo = () => {
  let user = {};

  if(document.cookie.includes('user')) {

    user = JSON.parse(document.cookie.split(';')[0].slice(5));
  } else {
    user = null;
  }


  return {user};
};
