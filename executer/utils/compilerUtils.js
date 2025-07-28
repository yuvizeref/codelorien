import { runCode as runCPPCode } from "../compilers/cpp.js";
import { runCode as runJavaCode } from "../compilers/java.js";
import { runCode as runPythonCode } from "../compilers/python.js";

const compilerMap = {
  cpp: runCPPCode,
  java: runJavaCode,
  py: runPythonCode,
};

export const runCode = async (code, input, language) => {
  try {
    const compileAndRun = compilerMap[language];

    const result = await compileAndRun(code, input);

    return result;
  } catch (err) {
    throw err;
  }
};
