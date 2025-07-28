import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const generateToken = (id, admin) => {
  return jwt.sign({ id, admin: admin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const languageExtensions = {
  js: ".js",
  py: ".py",
  java: ".java",
  go: ".go",
  c: ".c",
  cpp: ".cpp",
  ruby: ".rb",
  html: ".html",
  css: ".css",
  php: ".php",
  ts: ".ts",
};
