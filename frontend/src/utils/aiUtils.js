import axiosInstance from "../middleware/axiosInstance";

export const getReview = async (description, code) => {
  try {
    const response = await axiosInstance.post("/code-assist", {
      description: description,
      code: code,
    });

    if (response.status === 200) {
      return response.data.review;
    }
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
