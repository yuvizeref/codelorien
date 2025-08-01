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

    await execPromise(`g++ ${codeFilePath} -o ${compiledFilePath}`);

    const compiledProcess = spawn(compiledFilePath);

    if (input) {
      compiledProcess.stdin.write(input);
      compiledProcess.stdin.end();
    }

    let output = "";

    compiledProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    compiledProcess.stderr.on("data", (data) => {
      throw new Error(`Runtime error: ${data.toString()}`);
    });

    const exitCode = await new Promise((resolve, reject) => {
      compiledProcess.on("close", (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Process exited with code ${code}`);
        }
      });
    });

    return output;
  } catch (error) {
    throw error;
  }
};
