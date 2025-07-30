import axios from "axios";

const testCasesURL = "http://localhost:8000/api/testcases";

export const addTestCases = async (problemId, input, output, linesPerCase) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("User not logged in");

  const response = await axios.post(
    `${testCasesURL}/${problemId}`,
    {
      input: input ?? " ",
      output: output ?? " ",
      linesPerCase: linesPerCase,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    return await response.data.testCase;
  }
};

export const getTestCases = async (problemId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("User not logged in");

  const response = await axios.get(`${testCasesURL}/${problemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return await response.data.testCase;
  }
};
