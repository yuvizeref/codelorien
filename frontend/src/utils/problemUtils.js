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

export const addProblem = async (name, description, difficulty) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("User not logged in");

  const response = await axios.post(
    problemsURL,
    {
      name: name,
      description: description,
      difficulty: difficulty,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 200 || response.status === 201) {
    return await response.data.problem;
  }
};
