import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

dotenv.config();

export const createStaging = () => {
  const stagingName = uuidv4();

  const stagingPath = path.join(process.env.STAGING_BASE, stagingName);

  fs.mkdirSync(stagingPath, { recursive: true });

  return stagingPath;
};

export const deleteFileOrDir = async (targetPath) => {
  try {
    const stats = await fs.promises.stat(targetPath);
    if (stats.isFile()) {
      await fs.promises.unlink(targetPath);
    } else if (stats.isDirectory()) {
      const files = await fs.promises.readdir(targetPath);
      for (const file of files) {
        const currentPath = path.join(targetPath, file);
        await deleteFileOrDir(currentPath);
      }
      await fs.promises.rmdir(targetPath);
    }
  } catch (error) {
    console.error(`Error deleting ${targetPath}:`, error);
  }
};

export const createFile = (fileContent, folder, fileName) => {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const filePath = path.join(folder, fileName);

    fs.writeFileSync(filePath, fileContent);
    return filePath;
  } catch (error) {
    console.error("Error creating the file:", error);
  }
};
