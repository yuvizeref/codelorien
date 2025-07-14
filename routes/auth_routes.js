import express from "express";
import { body } from "express-validator";
import { login_route, logout_route } from "../controllers/auth_controller.js";
import { validate_login } from "../middleware/authenticate.js";

const auth_router = express.Router();

const validations = [
  body("email_or_username")
    .notEmpty()
    .withMessage("Provide a valid email address or user name"),
  body("password").notEmpty().withMessage("Password is required"),
];

auth_router.post("/login", validations, validate_login, login_route);

auth_router.post("/logout", logout_route);

export default auth_router;
