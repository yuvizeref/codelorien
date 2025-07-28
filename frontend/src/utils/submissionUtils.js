import axios from "axios";

const submissionsURL = "http://localhost:8000/api/submissions";

export const submitCode = async (problemId, code, language) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !token) throw new Error("User not logged in");

  try {
    const response = await axios.post(
      submissionsURL,
      {
        problemId,
        userId: user._id,
        code,
        language,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.submission;
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("Submit error:", error.message);
    throw error;
  }
};

export const getSubmission = async (submissionId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("User not logged in");

  const response = await axios.get(`${submissionsURL}/${submissionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return await response.data.submission;
  }
};
