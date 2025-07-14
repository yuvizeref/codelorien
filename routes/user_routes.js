import express from "express";
import { body } from "express-validator";
import { authenticate, authorize_admin } from "../middleware/authenticate.js";
import { validate_user_add } from "../middleware/user.js";
import {
  add_user_route,
  delete_user_route,
  get_users_route,
  update_password_route,
  update_user_route,
} from "../controllers/user_controller.js";

const user_router = express.Router();

const validations = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

user_router.get("/", authenticate, authorize_admin, get_users_route);

user_router.post("/", validations, validate_user_add, add_user_route);

user_router.delete("/:id", authenticate, authorize_admin, delete_user_route);

user_router.patch("/:id", authenticate, update_user_route);

user_router.patch("/:id/password", update_password_route);

export default user_router;
