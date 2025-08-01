import mongoose from "mongoose";
import {
  deleteFileFromStorage,
  getFileFromStorage,
  uploadFileToStorage,
} from "./storage.js";
import TestCases from "../models/testCasesModel.js";

export const getTestCases = async (problemId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid Problem ID");
  }
  const testCases = await TestCases.findOne({ problemId: problemId });

  if (testCases.input) testCases.input = getFileFromStorage(testCases.input);
  if (testCases.output) testCases.output = getFileFromStorage(testCases.output);

  return testCases;
};

export const addTestCases = async (
  input,
  output,
  linesPerCase,
  problemId,
  userId
) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }

  const inputFilePath = uploadFileToStorage(input);
  const outputFilePath = uploadFileToStorage(output);

  const testCase = await TestCases.findOne({ problemId: problemId });

  if (testCase) {
    if (testCase.input) deleteFileFromStorage(testCase.input);
    if (testCase.output) deleteFileFromStorage(testCase.output);

    testCase.input = inputFilePath;
    testCase.output = outputFilePath;
    testCase.linesPerCase = linesPerCase;
    testCase.modifiedBy = userId;
    testCase.modified = new Date();

    const saved = await testCase.save();
    return saved;
  } else {
    const newTestCase = new TestCases();

    newTestCase.input = inputFilePath;
    newTestCase.output = outputFilePath;
    newTestCase.linesPerCase = linesPerCase;
    newTestCase.problemId = problemId;
    newTestCase.createdBy = userId;
    newTestCase.modifiedBy = userId;
    newTestCase.created = new Date();
    newTestCase.modified = new Date();

    const saved = await newTestCase.save();
    return saved;
  }
};

export const deleteTestCases = async (problemId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }
  const testCase = await TestCases.findOne({ problemId });

  if (!testCase) return;

  if (testCase.input) deleteFileFromStorage(testCase.input);

  if (testCase.output) deleteFileFromStorage(testCase.output);

  return await TestCases.findByIdAndDelete(testCase._id);
};
