import { setSession, clearSession } from "../redux/actions/authActions";
import axiosInstance from "../middleware/axiosInstance";

export const login = async (emailOrUsername, password, dispatch) => {
  const response = await axiosInstance.post("/auth/login", {
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
