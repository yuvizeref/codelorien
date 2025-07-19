import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const storages = {
  code: process.env.CODE_PATH,
  input: process.env.INPUT_TC_PATH,
  output: process.env.OUTPUT_TC_PATH,
};

export const uploadFileToStorage = (file, store, ext = "") => {
  const uploadDir = storages[store];

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, uuidv4() + ext);
  fs.writeFileSync(filePath, file.buffer);
  return path.basename(filePath);
};

export const getFileFromStorage = (filename, store) => {
  const filePath = path.join(storages[store], filename);
  return filePath;
};

export const deleteFileFromStorage = (filename, store) => {
  const filePath = path.join(storages[store], filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist.`);
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
