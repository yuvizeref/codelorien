import axiosInstance from "../middleware/axiosInstance";

export const registerUser = async (username, email, fullName, password) => {
  const response = await axiosInstance.post("/users", {
    username: username,
    email: email,
    fullName: fullName,
    password: password,
  });

  if (response.status === 200) {
    console.log(response.data);
  }
};
