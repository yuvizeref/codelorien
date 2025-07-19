import dotenv from "dotenv";
import { exec } from "child_process";
import path from "path";
import { copyFileToDir, deleteFile } from "../utils/fileUtils.js";

dotenv.config();

export const runCode = async (codePath) => {
  try {
    const codeFilePath = copyCodeToStaging(codePath);

    const compiledFilePath = path.join(
      process.env.STAGING_PATH,
      "/compiled.out"
    );

    const result = await run(codeFilePath, compiledFilePath);

    return result;
  } catch (err) {
    return {
      success: false,
      error: err.error,
    };
  }
};

const copyCodeToStaging = (codePath) => {
  const codeStagingPath = path.join(process.env.STAGING_PATH, "/run.cpp");

  try {
    copyFileToDir(codePath, codeStagingPath);
  } catch (err) {
    throw new Error("Failed to copy code to staging directory.");
  }

  return codeStagingPath;
};

const run = (codeFilePath, compiledFilePath) => {
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${codeFilePath} -o ${compiledFilePath}`,
      (compileErr, stdout, stderr) => {
        if (compileErr || stderr) {
          return reject({
            success: false,
            error: `Compilation error: ${stderr || compileErr}`,
          });
        }
        exec(compiledFilePath, (runErr, runStdout, runStderr) => {
          deleteFile(compiledFilePath);

          if (runErr || runStderr) {
            return reject({
              success: false,
              error: `Runtime error: ${runStderr || runErr}`,
            });
          }

          resolve({
            success: true,
            output: runStdout,
          });
        });
      }
    );
  });
};
