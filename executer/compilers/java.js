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
    const codeFilePath = createFile(code, stagingDir, "Main.java");

    try {
      await execPromise(`javac ${codeFilePath}`);
    } catch (compileErr) {
      const error = new Error("Compilation failed");
      error.stderr = compileErr.stderr || compileErr.message;
      throw error;
    }

    const runProcess = spawn("java", ["-cp", stagingDir, "Main"]);

    if (input) {
      runProcess.stdin.write(input);
      runProcess.stdin.end();
    }

    let stdout = "";
    let stderr = "";

    runProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    runProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    const processPromise = new Promise((resolve, reject) => {
      runProcess.on("close", (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          const error = new Error("Runtime error");
          error.stderr = stderr || `Process exited with code ${code}`;
          reject(error);
        }
      });
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        runProcess.kill();
        const error = new Error("Execution timed out");
        error.stderr = "Time Limit Exceeded.";
        reject(error);
      }, 2000);
    });

    return await Promise.race([processPromise, timeoutPromise]);
  } catch (error) {
    throw error;
  }
};
