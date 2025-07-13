import mongoose from "mongoose";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

const save_user = async ({ username, email, password, full_name }) => {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) throw new Error("User already exists");

  const hashed_password = await bcrypt.hash(password, 10);

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

const update_user = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  // Prevent updating sensitive fields here or handle them separately
  const disallowed_fields = ["password", "created", "deleted", "role"];
  disallowed_fields.forEach((field) => delete updateData[field]);

  const updated_user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updated_user;
};

export { save_user, delete_user, get_users, update_user };
