import express from "express";
import {
  addSubmissionRoute,
  deleteSubmissionRoute,
  getSubmissionRoute,
  getSubmissionsRoute,
} from "../controllers/submissionController.js";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";

const submissionRouter = express.Router();

submissionRouter.get("/:id", authenticate, getSubmissionRoute);

submissionRouter.get("/problem/:problemId", authenticate, getSubmissionsRoute);

submissionRouter.post("/", authenticate, addSubmissionRoute);

submissionRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteSubmissionRoute
);

export default submissionRouter;
