import mongoose from "mongoose";
import Submission from "../models/submissionModel.js";
import { statuses } from "./enums.js";
import { deleteFileFromStorage, uploadFileToStorage } from "./storage.js";

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

  const fileKey = uploadFileToStorage(code);

  const submission = new Submission();

  submission.problemId = problemId;
  submission.userId = userId;
  submission.code = fileKey;
  submission.language = language;
  submission.status = statuses[0];
  submission.created = new Date();

  return await submission.save();
};

export const deleteSubmission = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid submission ID");
  }
  try {
    const submission = await Submission.findById(id);

    deleteFileFromStorage(submission.code);

    return await Submission.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

export const updateSubmissionStatus = async (submissionId, status) => {
  try {
    const submission = await getSubmission(submissionId);

    submission.status = status;

    return await submission.save();
  } catch (err) {
    throw err;
  }
};

export const updateSubmission = async (submissionId, updateData) => {
  try {
    return await Submission.findByIdAndUpdate(submissionId, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    throw err;
  }
};
