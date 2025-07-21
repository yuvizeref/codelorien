import {
  addTestCases,
  deleteTestCases,
  getTestCases,
} from "../utils/testCasesUtils.js";

export const getTestCasesRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const testCase = await getTestCases(id);
    res.status(200).json({ testCase });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addTestCasesRoute = async (req, res) => {
  try {
    const testCase = await addTestCases(
      req.body.input,
      req.body.output,
      req.body.linesPerCase,
      req.params.id,
      req.user.id
    );
    res.status(200).json({ testCase });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteTestCasesRoute = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTestCases(id);
    return res.status(200).json({
      message: "Test case is deleted.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
