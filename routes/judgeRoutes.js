import express from "express";
import { evaluateSubmissionRoute } from "../controllers/judgeController.js";

const judgeRouter = express.Router();

judgeRouter.post("/:submissionId", evaluateSubmissionRoute);

export default judgeRouter;
