import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { hashPassword } from "./commonUtils.js";
import { deleteSubmissionsByUserId } from "./submissionUtils.js";

export const saveUser = async ({ username, email, password, fullName }) => {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    fullName,
  });

  const saved = await user.save();

  const result = saved.toObject();
  delete result.password;
  return result;
};

export const deleteUser = async (id, purge = "true") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  if (purge === "true") {
    deleteSubmissionsByUserId(id);
    return await User.findByIdAndDelete(id);
  } else {
    return await User.findByIdAndUpdate(
      id,
      { deleted: true, modified: new Date() },
      { new: true }
    );
  }
};

export const getUsers = async (showDeleted = false) => {
  if (showDeleted) return await User.find().select("-password");
  return await User.find({ deleted: false }).select("-password");
};

export const getUser = async (userId) => {
  return await User.findById(userId).select("-password");
};

export const updateUser = async (id, updateData, admin = false) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(id);

  if (user.username === "admin" && updateData.username !== "admin") {
    throw new Error("Admin username cannot be updated");
  }

  if (updateData.password) {
    updateData.password = await hashPassword(updateData.password);
  }

  let disallowedFields = ["created"];
  if (!admin) {
    disallowedFields = ["password", "created", "admin"];
  }

  disallowedFields.forEach((field) => delete updateData[field]);

  updateData["modified"] = new Date();

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updatedUser;
};

export const updatePassword = async (id, oldPassword, newPassword) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(id);
  if (!user || user.deleted) {
    throw new Error("User not found");
  }

  const oldPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!oldPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  user.modified = new Date();

  await user.save();

  return { message: "Password updated successfully" };
};

export const createAdminUser = async () => {
  const admin = await User.findOne({ username: "admin" });

  if (!admin) {
    const user = new User();

    user.username = "admin";
    user.email = "admin@codelorien.com";
    user.fullName = "Administrator";
    user.password = await hashPassword(process.env.ADMIN_PASS);
    user.admin = true;
    user.created = new Date();
    user.modified = new Date();

    await user.save();
  }
};
