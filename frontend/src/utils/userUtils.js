import axios from "axios";

const userURL = "http://localhost:8000/api/users";

export const registerUser = async (username, email, fullName, password) => {
  const response = await axios.post(userURL, {
    username: username,
    email: email,
    fullName: fullName,
    password: password,
  });

  if (response.status === 200) {
    console.log(response.data);
  }
};
