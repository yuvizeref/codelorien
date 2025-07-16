import mongoose from "mongoose";
import { getFileFromStorage, uploadFileToStorage } from "./storage.js";
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

export const addInputTestCase = async (file, problemId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }

  const filePath = uploadFileToStorage(file, "/tc/input");

  const testCase = await TestCases.findOne({ problemId: problemId });

  if (testCase) {
    testCase.input = filePath;
    testCase.modifiedBy = userId;
    testCase.modified = new Date();

    return await testCase.save();
  } else {
    const newTestCase = new TestCases();

    newTestCase.input = filePath;
    newTestCase.problemId = problemId;
    newTestCase.createdBy = userId;
    newTestCase.modifiedBy = userId;
    newTestCase.created = new Date();
    newTestCase.modified = new Date();

    return await newTestCase.save();
  }
};

export const addOutputTestCase = async (file, problemId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    throw new Error("Invalid problem ID");
  }

  const filePath = uploadFileToStorage(file, "/tc/output");

  const testCase = await TestCases.findOne({ problemId: problemId });

  if (testCase) {
    testCase.output = filePath;
    testCase.modifiedBy = userId;
    testCase.modified = new Date();

    const saved = await testCase.save();
    return saved;
  } else {
    const newTestCase = new TestCases();

    newTestCase.output = filePath;
    newTestCase.problemId = problemId;
    newTestCase.createdBy = userId;
    newTestCase.modifiedBy = userId;
    newTestCase.created = new Date();
    newTestCase.modified = new Date();

    const saved = await newTestCase.save();
    return saved;
  }
};

export const deleteTestCase = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid problem ID");
  }
  return await TestCases.findByIdAndDelete(id);
};
