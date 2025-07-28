import mongoose from "mongoose";
import { languages, statuses } from "../utils/enums.js";

const submissionSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: languages,
    required: true,
  },
  status: {
    type: String,
    enum: statuses,
    required: true,
  },
  passedTests: {
    type: [Number],
  },
  failedTests: {
    type: [Number],
  },
  error: {
    type: String,
  },
  evaluated: {
    type: Boolean,
  },
  executionTime: {
    type: Number,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
