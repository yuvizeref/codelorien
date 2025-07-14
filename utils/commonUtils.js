import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (id, admin) => {
  return jwt.sign({ id, admin: admin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export { hashPassword, generateToken };
