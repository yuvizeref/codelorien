import mongoose from "mongoose";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import { hash_password } from "./common_utils.js";

const save_user = async ({ username, email, password, full_name }) => {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) throw new Error("User already exists");

  const hashed_password = await hash_password(password);

  const user = new User({
    username,
    email,
    password: hashed_password,
    full_name,
  });

  const saved = await user.save();

  const result = saved.toObject();
  delete result.password;
  return result;
};

const delete_user = async (id, purge = false) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  if (purge) {
    return await User.findByIdAndDelete(id);
  } else {
    return await User.findByIdAndUpdate(
      id,
      { deleted: true, modified: new Date() },
      { new: true }
    );
  }
};

const get_users = async (show_deleted = false) => {
  if (show_deleted) return await User.find().select("-password");
  return await User.find({ deleted: false }).select("-password");
};

const update_user = async (id, updateData, admin = false) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  let disallowed_fields = ["created"];
  if (!admin) {
    disallowed_fields = ["password", "created", "admin"];
  }

  disallowed_fields.forEach((field) => delete updateData[field]);

  updateData["modified"] = new Date();

  const updated_user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updated_user;
};

const update_password = async (id, old_password, new_password) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(id);
  if (!user || user.deleted) {
    throw new Error("User not found");
  }

  const is_old_password_valid = await bcrypt.compare(
    old_password,
    user.password
  );

  if (!is_old_password_valid) {
    throw new Error("Old password is incorrect");
  }

  const hashed_password = await hash_password(new_password);

  user.password = hashed_password;
  user.modified = new Date();

  await user.save();

  return { message: "Password updated successfully" };
};

export { save_user, delete_user, get_users, update_user, update_password };
