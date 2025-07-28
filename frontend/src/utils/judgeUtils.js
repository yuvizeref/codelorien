import axios from "axios";

const judgeURL = "http://localhost:8000/api/judge";

export const judgeSubmission = async (submissionId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("User not logged in");

  try {
    const response = await axios.post(`${judgeURL}/${submissionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("Submit error:", error.message);
    throw error;
  }
};
