import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getReviewRoute } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/", authenticate, getReviewRoute);

export default aiRouter;
