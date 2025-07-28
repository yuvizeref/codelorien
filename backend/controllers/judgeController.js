import { runSubmission } from "../utils/judgeUtils.js";

export const evaluateSubmissionRoute = async (req, res) => {
  try {
    await runSubmission(req.params.submissionId);
    return res.status(200).json({ message: "Evaluation submitted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to start evaluating submission." });
  }
};
