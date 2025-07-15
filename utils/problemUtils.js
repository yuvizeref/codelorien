import mongoose from "mongoose";
import Problem from "../models/problemModel.js";

const getProblems = async (showDeleted = false) => {
  if (showDeleted) return await Problem.find();
  return await Problem.find({ deleted: false });
};

const getProblemById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }
  return await Problem.findById(id);
};

const addProblem = async ({ name, description, difficulty }, creator) => {
  const problem = new Problem({
    name,
    description,
    difficulty,
    createdBy: creator,
    modifiedBy: creator,
  });
  return await problem.save();
};

const updateProblem = async (id, updateData, user) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }

  updateData.modified = new Date();
  updateData.modifiedBy = user;

  return await Problem.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteProblem = async (id, user, purge = false) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }
  if (purge) {
    return await Problem.findByIdAndDelete(id);
  } else {
    return await Problem.findByIdAndUpdate(
      id,
      { deleted: true, modifiedBy: user, modified: new Date() },
      { new: true }
    );
  }
};

export {
  getProblems,
  getProblemById,
  addProblem,
  updateProblem,
  deleteProblem,
};
