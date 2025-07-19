import dotenv from "dotenv";
import { runCode as runCPPCode } from "../compilers/cpp.js";
import { runCode as runJavaCode } from "../compilers/java.js";
import { runCode as runPythonCode } from "../compilers/python.js";
import { getFileFromStorage } from "./storage.js";
import { getSubmission } from "./submissionUtils.js";

dotenv.config();

const compilerMap = {
  cpp: runCPPCode,
  java: runJavaCode,
  py: runPythonCode,
};

export const runSubmission = async (submissionId) => {
  try {
    const submission = await getSubmission(submissionId);

    const codeFilePath = getFileFromStorage(submission.code, "code");

    const compileAndRun = compilerMap[submission.language];

    const result = await compileAndRun(codeFilePath);

    return result;
  } catch (err) {
    throw err;
  }
};
