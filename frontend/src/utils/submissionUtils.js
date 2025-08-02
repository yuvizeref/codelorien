import axiosInstance from "../middleware/axiosInstance";

export const submitCode = async (problemId, code, language) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) throw new Error("User not logged in");

  try {
    const response = await axiosInstance.post("/submissions", {
      problemId,
      userId: user._id,
      code,
      language,
    });

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
  const response = await axiosInstance.get(`/submissions/${submissionId}`);

  if (response.status === 200) {
    return await response.data.submission;
  }
};

export const getSubmissions = async (problemId) => {
  const response = await axiosInstance.get(`/submissions/problem/${problemId}`);

  if (response.status === 200) {
    return response.data.submissions;
  }
};
