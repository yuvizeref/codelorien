import mongoose from "mongoose";
import {
  deleteFileFromStorage,
  getFileFromStorage,
  uploadFileToStorage,
} from "./storage.js";
import TestCases from "../models/testCasesModel.js";

export const getTestCases = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid test case ID");
  }
  const testCase = await TestCases.findOne({ problemId: id });

  if (testCase.input)
    testCase.input = getFileFromStorage(testCase.input, "/tc/input");

  if (testCase.output)
    testCase.output = getFileFromStorage(testCase.output, "/tc/output");

  return testCase;
};

export const addTestCases = async (input, output, problemId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }

  const inputFilePath = uploadFileToStorage(input, "/tc/input");
  const outputFilePath = uploadFileToStorage(output, "/tc/output");

  const testCase = await TestCases.findOne({ problemId: problemId });

  if (testCase) {
    testCase.input = inputFilePath;
    testCase.output = outputFilePath;
    testCase.modifiedBy = userId;
    testCase.modified = new Date();

    const saved = await testCase.save();
    return saved;
  } else {
    const newTestCase = new TestCases();

    newTestCase.input = inputFilePath;
    newTestCase.output = outputFilePath;
    newTestCase.problemId = problemId;
    newTestCase.createdBy = userId;
    newTestCase.modifiedBy = userId;
    newTestCase.created = new Date();
    newTestCase.modified = new Date();

    const saved = await newTestCase.save();
    return saved;
  }
};

export const deleteTestCases = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }
  const testCase = await TestCases.findById(id);

  if (testCase.input) deleteFileFromStorage(testCase.input, "/tc/input/");

  if (testCase.output) deleteFileFromStorage(testCase.output, "/tc/output/");

  return await TestCases.findByIdAndDelete(id);
};
