import axiosInstance from "../middleware/axiosInstance";

export const addTestCases = async (problemId, input, output, linesPerCase) => {
  const response = await axiosInstance.post(`/testcases/${problemId}`, {
    input: input ?? " ",
    output: output ?? " ",
    linesPerCase: linesPerCase,
  });

  if (response.status === 200 || response.status === 201) {
    return await response.data.testCase;
  }
};

export const getTestCases = async (problemId) => {
  const response = await axiosInstance.get(`/testcases/${problemId}`);

  if (response.status === 200) {
    return await response.data.testCase;
  }
};
