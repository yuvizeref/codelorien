import express from "express";
import { body } from "express-validator";
import {
  add_user_route,
  delete_user_route,
  get_users_route,
  update_password_route,
  update_user_route,
} from "../controllers/user_controller.js";

const user_router = express.Router();

const validation_add = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

user_router.get("/", get_users_route);

user_router.post(
  "/",
  validation_add,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  add_user_route
);

user_router.delete("/:id", delete_user_route);

user_router.patch("/:id", update_user_route);

user_router.patch("/:id/password", update_password_route);

export default user_router;
