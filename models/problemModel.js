import mongoose from "mongoose";
import { difficulties } from "../utils/enums.js";

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: difficulties,
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
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
