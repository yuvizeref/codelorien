import express from "express";
import { body, validationResult } from "express-validator";
import {
  delete_user,
  get_users,
  save_user,
  update_user,
} from "../utils/user_utility.js";

import User from "../models/user_model.js";
const user_router = express.Router();

const validation_add = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

user_router.get("/", async (req, res) => {
  const { show_deleted } = req.query;
  try {
    const users = await get_users(show_deleted);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

user_router.post("/", validation_add, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await save_user(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

user_router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { purge } = req.query;

  try {
    const deleted = await delete_user(id, purge === "true");

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message:
        purge === "true" ? "User permanently deleted" : "User soft-deleted",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

user_router.patch("/:id", async (req, res) => {
  try {
    const updated_user = await update_user(req.params.id, req.body);

    if (!updated_user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updated_user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default user_router;
