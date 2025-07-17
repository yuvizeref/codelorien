import express from "express";
import multer from "multer";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";
import {
  addTestCasesRoute,
  deleteTestCasesRoute,
  getTestCasesRoute,
} from "../controllers/testCasesController.js";
import { validateFiles, validateFileUpload } from "../middleware/testCases.js";

const testCasesRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

testCasesRouter.get("/:id", authenticate, authorizeAdmin, getTestCasesRoute);

testCasesRouter.post(
  "/:id",
  authenticate,
  authorizeAdmin,
  upload.fields([
    { name: "input", maxCount: 1 },
    { name: "output", maxCount: 1 },
  ]),
  validateFiles,
  validateFileUpload,
  addTestCasesRoute
);

testCasesRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteTestCasesRoute
);

export default testCasesRouter;
