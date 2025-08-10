import path from "path";
import { exec, spawn } from "child_process";
import { promisify } from "util";
import {
  createFile,
  createStaging,
  deleteFileOrDir,
} from "../utils/fileUtils.js";

const execPromise = promisify(exec);

export const runCode = async (code, input) => {
  let stagingDir;
  try {
    stagingDir = createStaging();
    const output = await run(code, input, stagingDir);
    return output;
  } catch (err) {
    if (!err.stderr) {
      err.stderr = err.message;
    }
    throw err;
  } finally {
    if (stagingDir) {
      deleteFileOrDir(stagingDir);
    }
  }
};

export const run = async (code, input, stagingDir) => {
  try {
    const codeFilePath = createFile(code, stagingDir, "run.cpp");
    const compiledFilePath = path.join(stagingDir, "compiled.out");

    try {
      await execPromise(`g++ ${codeFilePath} -o ${compiledFilePath}`);
    } catch (compileErr) {
      const error = new Error("Compilation failed");
      error.stderr = compileErr.stderr || compileErr.message;
      throw error;
    }

    const compiledProcess = spawn(compiledFilePath);

    if (input) {
      compiledProcess.stdin.write(input);
      compiledProcess.stdin.end();
    }

    let stdout = "";
    let stderr = "";

    compiledProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    compiledProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        compiledProcess.kill();
        const timeoutError = new Error("Execution timed out");
        timeoutError.stderr = "Time Limit Exceeded.";
        reject(timeoutError);
      }, 2000);
    });

    const processPromise = new Promise((resolve, reject) => {
      compiledProcess.on("close", (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          const runtimeError = new Error("Runtime error");
          runtimeError.stderr = stderr || `Process exited with code ${code}`;
          reject(runtimeError);
        }
      });
    });

    return await Promise.race([processPromise, timeoutPromise]);
  } catch (error) {
    throw error;
  }
};
