import express from "express";
import multer from "multer";
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

const storage = multer.memoryStorage();

const upload = multer({ storage });

submissionRouter.get(
  "/:id",
  authenticate,
  authorizeSelfOrAdmin,
  getSubmissionRoute
);

submissionRouter.get(
  "/problem/:problemId/user/:userId",
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
