import axiosInstance from "../middleware/axiosInstance";

export const judgeSubmission = async (submissionId) => {
  try {
    const response = await axiosInstance.post(`/judge/${submissionId}`);

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
