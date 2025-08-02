import express from "express";
import {
  addSubmissionRoute,
  deleteSubmissionRoute,
  getSubmissionRoute,
  getSubmissionsRoute,
} from "../controllers/submissionController.js";
import {
  authenticate,
  authorizeAdmin,
  authorizeSelf,
  authorizeSelfOrAdmin,
} from "../middleware/authenticate.js";

const submissionRouter = express.Router();

submissionRouter.get(
  "/:id",
  authenticate,
  authorizeSelfOrAdmin,
  getSubmissionRoute
);

submissionRouter.get(
  "/problem/:problemId",
  authenticate,
  authorizeSelfOrAdmin,
  getSubmissionsRoute
);

submissionRouter.post("/", authenticate, authorizeSelf, addSubmissionRoute);

submissionRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteSubmissionRoute
);

export default submissionRouter;
