import axios from "axios";
import { setSession, clearSession } from "../redux/actions/authActions";

const authURL = "http://localhost:8000/api/auth";

export const login = async (emailOrUsername, password, dispatch) => {
  const response = await axios.post(`${authURL}/login`, {
    emailOrUsername: emailOrUsername,
    password: password,
  });
  if (response.status === 200) {
    const { token, user } = response.data;
    dispatch(setSession(token, user));

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const logout = (dispatch) => {
  dispatch(clearSession());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
