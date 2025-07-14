import express from "express";
import { loginRoute, logoutRoute } from "../controllers/authController.js";
import { loginValidations, validateLogin } from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/login", loginValidations, validateLogin, loginRoute);

authRouter.post("/logout", logoutRoute);

export default authRouter;
