import { runCode } from "./compilerUtils.js";
import { getFileFromStorage } from "./storage.js";
import { getSubmission, updateSubmission } from "./submissionUtils.js";
import { getTestCases } from "./testCasesUtils.js";

export const runSubmission = async (submissionId) => {
  try {
    const submission = await getSubmission(submissionId);

    evaluateSubmission(submission);

    await updateSubmission(submissionId, { status: "running" });
  } catch (err) {
    throw err;
  }
};

export const evaluateSubmission = async (submission) => {
  const code = getFileFromStorage(submission.code);
  const testCases = await getTestCases(submission.problemId);

  runCode(code, testCases.input, submission.language)
    .then((output) => {
      judgeResult(submission.id, output);
    })
    .catch(async (err) => {
      await updateSubmission(submission.id, {
        status: "failed",
        error: err.message,
        evaluated: true,
      });
    });
};

const judgeResult = async (submissionId, output) => {
  try {
    const submission = await getSubmission(submissionId);
    const testCases = await getTestCases(submission.problemId);

    const { passed, failed } = compareOutputs(
      output,
      testCases.output,
      testCases.linesPerCase
    );

    await updateSubmission(submissionId, {
      passedTests: passed,
      failedTests: failed,
      status: failed.length > 0 ? "failed" : "accepted",
      error: "",
      evaluated: true,
    });
  } catch (err) {
    throw err;
  }
};

export const splitOutput = (output, linesPerTestCase) => {
  const lines = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const testCases = [];

  for (let i = 0; i < lines.length; i += linesPerTestCase) {
    const testCase = lines.slice(i, i + linesPerTestCase).join("\n");
    testCases.push(testCase);
  }

  return testCases;
};

const compareOutputs = (actualOutput, expectedOutput, linesPerTestCase) => {
  const actualTestCases = splitOutput(actualOutput, linesPerTestCase);
  const expectedTestCases = splitOutput(expectedOutput, linesPerTestCase);

  let passed = [];
  let failed = [];

  for (let i = 0; i < expectedTestCases.length; i++) {
    const expected = expectedTestCases[i];
    const actual = actualTestCases[i] || "";

    if (actual.trim() === expected.trim()) {
      passed.push(i + 1);
    } else {
      failed.push(i + 1);
    }
  }

  return { passed: passed, failed: failed };
};
