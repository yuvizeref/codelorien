import axios from "axios";

const problemsURL = "http://localhost:8000/api/problems";

export const getProblems = async () => {
  const response = await axios.get(problemsURL);
  if (response.status === 200) {
    return await response.data.problems;
  }
};

export const getProblemById = async (problemId) => {
  const response = await axios.get(`${problemsURL}/${problemId}`);
  if (response.status === 200) {
    return await response.data.problem;
  }
};
