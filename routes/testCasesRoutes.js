import express from "express";
import multer from "multer";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";
import {
  addInputTestCasesRoute,
  addOutputTestCasesRoute,
  deleteTestCasesRoute,
  getTestCasesRoute,
} from "../controllers/testCasesController.js";

const testCasesRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

testCasesRouter.get("/:id", authenticate, authorizeAdmin, getTestCasesRoute);

testCasesRouter.post(
  "/:id/input",
  authenticate,
  authorizeAdmin,
  upload.single("file"),
  addInputTestCasesRoute
);

testCasesRouter.post(
  "/:id/output",
  authenticate,
  authorizeAdmin,
  upload.single("file"),
  addOutputTestCasesRoute
);

testCasesRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteTestCasesRoute
);

export default testCasesRouter;
