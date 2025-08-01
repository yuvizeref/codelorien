import {
  addProblem,
  deleteProblem,
  getProblemById,
  getProblems,
  updateProblem,
} from "../utils/problemUtils.js";

export const getProblemsRoute = async (req, res) => {
  const { showDeleted } = req.query;
  try {
    const problems = await getProblems(showDeleted);
    res.status(200).json({ problems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};

export const getProblemByIdRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await getProblemById(id);
    res.status(200).json({ problem });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch problem" });
  }
};

export const addProblemRoute = async (req, res) => {
  try {
    const problem = await addProblem(req.body, req.user.id);
    res.status(201).json({ problem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProblemRoute = async (req, res) => {
  try {
    const updatedProblem = await updateProblem(
      req.params.id,
      req.body,
      req.user.id
    );

    if (!updatedProblem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.status(200).json({ problem: updatedProblem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProblemRoute = async (req, res) => {
  const { id } = req.params;

  const purge = req.query.purge ? req.query.purge : "true";

  try {
    const deleted = await deleteProblem(id, purge);

    if (!deleted) {
      return res.status(404).json({ error: "Problem not found" });
    }

    return res.status(200).json({
      message:
        purge === "true"
          ? "Problem permanently deleted"
          : "Problem soft-deleted",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
