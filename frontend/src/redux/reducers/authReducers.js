import { SET_SESSION, CLEAR_SESSION } from "../actions/authActions";

const initialState = {
  token: null,
  user: null,
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
      };
    case CLEAR_SESSION:
      return {
        ...state,
        token: null,
        user: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
