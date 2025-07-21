import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";
import {
  addTestCasesRoute,
  deleteTestCasesRoute,
  getTestCasesRoute,
} from "../controllers/testCasesController.js";
import { validateFiles, validateTestCases } from "../middleware/testCases.js";

const testCasesRouter = express.Router();

testCasesRouter.get("/:id", authenticate, authorizeAdmin, getTestCasesRoute);

testCasesRouter.post(
  "/:id",
  authenticate,
  authorizeAdmin,
  validateFiles,
  validateTestCases,
  addTestCasesRoute
);

testCasesRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteTestCasesRoute
);

export default testCasesRouter;
