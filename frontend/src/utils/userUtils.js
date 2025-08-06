import axiosInstance from "../middleware/axiosInstance";

export const registerUser = async (username, email, fullName, password) => {
  await axiosInstance.post("/users", {
    username: username,
    email: email,
    fullName: fullName,
    password: password,
  });
};

export const getUser = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);

  if (response.status === 200) {
    return response.data.user;
  }
};

export const getUsers = async () => {
  const response = await axiosInstance.get(`/users`);

  if (response.status === 200) {
    return response.data.users;
  }
};

export const updateUser = async (userId, username, email, fullName) => {
  await axiosInstance.patch(`/users/${userId}`, {
    username: username,
    email: email,
    fullName: fullName,
  });
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/users/${userId}`);

  if (response.status === 200) {
    return response.data.user;
  }
};
