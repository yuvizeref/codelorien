import mongoose from "mongoose";

const testCasesSchema = new mongoose.Schema({
  input: {
    type: String,
    default: null,
  },
  output: {
    type: String,
    default: null,
  },
  problemId: {
    type: String,
    unique: true,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  modifiedBy: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modified: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const TestCases = mongoose.model("TestCases", testCasesSchema);

export default TestCases;
