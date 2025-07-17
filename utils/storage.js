import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const STORAGE_PATH = process.env.STORAGE_PATH || "./storage";

export const uploadFileToStorage = (file, dir, ext = "") => {
  const uploadDir = path.resolve(STORAGE_PATH + dir);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, uuidv4() + ext);
  fs.writeFileSync(filePath, file.buffer);
  return path.basename(filePath);
};

export const getFileFromStorage = (filename, dir) => {
  const filePath = path.join(STORAGE_PATH + dir, filename);
  return filePath;
};
