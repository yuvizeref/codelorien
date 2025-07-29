import express from "express";
import { runRoute } from "../controllers/runController.js";
import { authenticate } from "../middleware/authenticate.js";

const runRouter = express.Router();

runRouter.post("/", authenticate, runRoute);

export default runRouter;
