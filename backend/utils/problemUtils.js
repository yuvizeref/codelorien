import mongoose from "mongoose";
import Problem from "../models/problemModel.js";
import TestCases from "../models/testCasesModel.js";
import { deleteTestCases } from "./testCasesUtils.js";
import { deleteSubmissionsByProblemId } from "./submissionUtils.js";

export const getProblems = async (showDeleted = false) => {
  if (showDeleted) return await Problem.find();
  return await Problem.find({ deleted: false });
};

export const getProblemById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }
  return await Problem.findById(id);
};

export const addProblem = async (
  { name, description, difficulty },
  creator
) => {
  const problem = new Problem({
    name,
    description,
    difficulty,
    createdBy: creator,
    modifiedBy: creator,
  });

  const saved = await problem.save();

  const testCase = new TestCases();

  testCase.problemId = saved.id;
  testCase.createdBy = creator;
  testCase.modifiedBy = creator;
  testCase.created = new Date();
  testCase.modified = new Date();

  testCase.save();

  return saved;
};

export const updateProblem = async (id, updateData, user) => {
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

export const deleteProblem = async (id, user, purge = "true") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }
  try {
    if (purge === "true") {
      deleteTestCases(id);
      deleteSubmissionsByProblemId(id);
      return await Problem.findByIdAndDelete(id);
    } else {
      return await Problem.findByIdAndUpdate(
        id,
        { deleted: true, modifiedBy: user, modified: new Date() },
        { new: true }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
