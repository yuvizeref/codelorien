import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const baseDir = process.env.STORAGE_BASE;

export const uploadFileToStorage = (fileContent) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");

  const fileName = uuidv4();

  const dirPath = path.join(baseDir, String(year), month, day, hour);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, fileName);

  fs.writeFileSync(filePath, fileContent);
  const fileKey = path.join(String(year), month, day, hour, fileName);
  return fileKey;
};

export const getFileFromStorage = (fileKey) => {
  const filePath = path.join(baseDir, fileKey);

  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8");
  } else {
    throw new Error("File not found");
  }
};

export const deleteFileFromStorage = async (fileKey) => {
  const filePath = path.join(baseDir, fileKey);

  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    throw new Error("File not found or failed to delete");
  }
};
