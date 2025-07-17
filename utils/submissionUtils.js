import mongoose from "mongoose";
import Submission from "../models/submissionModel.js";
import { languageExtensions } from "./commonUtils.js";
import { statuses } from "./enums.js";
import { generateFileObject } from "./fileUtils.js";
import { uploadFileToStorage } from "./storage.js";

export const getSubmissions = async (problemId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Submission.find({
    problemId: problemId,
    userId: userId,
  });
};

export const getSubmission = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid submission ID");
  }

  return await Submission.findById(id);
};

export const addSubmission = async ({ problemId, code, language }, userId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const codeObject = generateFileObject(code);

  const fileName = uploadFileToStorage(
    codeObject,
    "/code/",
    languageExtensions[language]
  );

  const submission = new Submission();

  submission.problemId = problemId;
  submission.userId = userId;
  submission.code = fileName;
  submission.language = language;
  submission.status = statuses[0];
  submission.created = new Date();

  return await submission.save();
};

export const deleteSubmission = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid submission ID");
  }
  return await Submission.findByIdAndDelete(id);
};
