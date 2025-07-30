import axios from "axios";

const submissionsURL = "http://localhost:8000/api/run";

export const runCode = async (code, input, language) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !token) throw new Error("User not logged in");

  try {
    const response = await axios.post(
      submissionsURL,
      {
        code: code,
        input: input,
        language: language,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.result;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
