import {
  addInputTestCase,
  addOutputTestCase,
  deleteTestCase,
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

export const addInputTestCasesRoute = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const testCase = await addInputTestCase(
      req.file,
      req.params.id,
      req.user.id
    );
    res.status(200).json({ testCase });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addOutputTestCasesRoute = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const testCase = await addOutputTestCase(
      req.file,
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
    await deleteTestCase(id);
    return res.status(200).json({
      message: "Test case is deleted.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
