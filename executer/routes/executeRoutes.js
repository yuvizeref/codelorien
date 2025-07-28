import express from "express";
import { executeRoute } from "../controllers/executeController.js";

const executeRouter = express.Router();

executeRouter.post("/", executeRoute);

export default executeRouter;
