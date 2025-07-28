import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const runCode = async (code, input, language) => {
  try {
    const response = await axios.post(
      `${process.env.EXECUTER_URL}/api/execute`,
      {
        code: code,
        input: input,
        language: language,
      }
    );
    return response.data.result;
  } catch (err) {
    throw new Error(err.response.data.error.stderr);
  }
};
