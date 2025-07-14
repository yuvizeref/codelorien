import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hash_password = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generate_token = (id, admin) => {
  return jwt.sign({ id, admin: admin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export { hash_password, generate_token };
