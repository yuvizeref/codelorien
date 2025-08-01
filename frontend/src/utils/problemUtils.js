import axiosInstance from "../middleware/axiosInstance";

export const getProblems = async () => {
  const response = await axiosInstance.get("/problems");
  if (response.status === 200) {
    return await response.data.problems;
  }
};

export const getProblemById = async (problemId) => {
  const response = await axiosInstance.get(`/problems/${problemId}`);
  if (response.status === 200) {
    return await response.data.problem;
  }
};

export const deleteProblemById = async (problemId) => {
  const response = await axiosInstance.delete(`/problems/${problemId}`);

  if (response.status === 200) {
    return await response.data.message;
  }
};

export const addProblem = async (name, description, difficulty) => {
  const response = await axiosInstance.post("/problems", {
    name: name,
    description: description,
    difficulty: difficulty,
  });
  if (response.status === 200 || response.status === 201) {
    return await response.data.problem;
  }
};

export const updateProblem = async (
  problemId,
  name,
  description,
  difficulty
) => {
  const response = await axiosInstance.patch(`/problems/${problemId}`, {
    name: name,
    description: description,
    difficulty: difficulty,
  });

  if (response.status === 200 || response.status === 201) {
    return await response.data.problem;
  }
};
