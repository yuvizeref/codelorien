import express from "express";
import { body, validationResult } from "express-validator";
import { login_route, logout_route } from "../controllers/auth_controller.js";

const auth_router = express.Router();

const login_validation = [
  body("email_or_username")
    .notEmpty()
    .withMessage("Provide a valid email address or user name"),
  body("password").notEmpty().withMessage("Password is required"),
];

auth_router.post(
  "/login",
  login_validation,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  login_route
);

auth_router.post("/logout", logout_route);

export default auth_router;
