import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";
import {
  addProblemRoute,
  deleteProblemRoute,
  getProblemByIdRoute,
  getProblemsRoute,
  updateProblemRoute,
} from "../controllers/problemController.js";

const problemRouter = express.Router();

problemRouter.get("/", getProblemsRoute);

problemRouter.get("/:id", getProblemByIdRoute);

problemRouter.post("/", authenticate, authorizeAdmin, addProblemRoute);

problemRouter.patch("/:id", authenticate, authorizeAdmin, updateProblemRoute);

problemRouter.delete("/:id", authenticate, authorizeAdmin, deleteProblemRoute);

export default problemRouter;
