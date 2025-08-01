import axiosInstance from "../middleware/axiosInstance";

export const runCode = async (code, input, language) => {
  try {
    const response = await axiosInstance.post("/run", {
      code: code,
      input: input,
      language: language,
    });

    return response.data.result;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
