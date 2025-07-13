import bcrypt from "bcryptjs";

const hash_password = async (password) => {
  return await bcrypt.hash(password, 10);
};

export { hash_password };
