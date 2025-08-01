import {
  addSubmission,
  deleteSubmission,
  getSubmission,
  getSubmissions,
} from "../utils/submissionUtils.js";

export const getSubmissionsRoute = async (req, res) => {
  const { problemId, userId } = req.params;
  try {
    const submissions = await getSubmissions(problemId, userId);
    res.status(200).json({ submissions });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getSubmissionRoute = async (req, res) => {
  try {
    const submission = await getSubmission(req.params.id);
    res.status(200).json({ submission });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addSubmissionRoute = async (req, res) => {
  try {
    const submission = await addSubmission(req.body, req.user.id);
    res.status(200).json({ submission });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteSubmissionRoute = async (req, res) => {
  try {
    const deleted = await deleteSubmission(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Submission not found" });
    }

    return res.status(200).json({
      message: "Submission deleted",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
