import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";
import {
  addProblemRoute,
  deleteProblemRoute,
  getProblemByIdRoute,
  getProblemsRoute,
  updateProblemRoute,
} from "../controllers/problemController.js";
import {
  problemAddValidations,
  validateProblemAdd,
} from "../middleware/problem.js";

const problemRouter = express.Router();

problemRouter.get("/", getProblemsRoute);

problemRouter.get("/:id", getProblemByIdRoute);

problemRouter.post(
  "/",
  authenticate,
  authorizeAdmin,
  problemAddValidations,
  validateProblemAdd,
  addProblemRoute
);

problemRouter.patch("/:id", authenticate, authorizeAdmin, updateProblemRoute);

problemRouter.delete("/:id", authenticate, authorizeAdmin, deleteProblemRoute);

export default problemRouter;
