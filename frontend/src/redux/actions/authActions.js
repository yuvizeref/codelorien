export const SET_SESSION = "SET_SESSION";
export const CLEAR_SESSION = "CLEAR_SESSION";

export const setSession = (token, user) => {
  return {
    type: SET_SESSION,
    payload: { token, user, loggedIn: true },
  };
};

export const clearSession = () => {
  return {
    type: CLEAR_SESSION,
  };
};
