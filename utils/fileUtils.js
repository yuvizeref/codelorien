import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

export const generateFileObject = (content) => {
  try {
    const fileBuffer = Buffer.from(content, "utf-8");
    return { buffer: fileBuffer };
  } catch (err) {
    throw err;
  }
};

export const copyFileToDir = async (srcFilePath, destFilePath) => {
  try {
    const destDir = path.dirname(destFilePath);
    await fsPromises.mkdir(destDir, { recursive: true });

    await fsPromises.copyFile(srcFilePath, destFilePath);
  } catch (error) {
    throw new Error(`Error copying file: ${error.message}`);
  }
};

export const deleteFile = async (filePath) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filePath} does not exist.`);
      return;
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
        return;
      }
    });
  });
};
