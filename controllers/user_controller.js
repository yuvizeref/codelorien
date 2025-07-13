import { validationResult } from "express-validator";
import {
  delete_user,
  get_users,
  save_user,
  update_password,
  update_user,
} from "../utils/user_utils.js";

const get_users_route = async (req, res) => {
  const { show_deleted } = req.query;
  try {
    const users = await get_users(show_deleted);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const add_user_route = async (req, res) => {
  try {
    const user = await save_user(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const delete_user_route = async (req, res) => {
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
};

const update_user_route = async (req, res) => {
  try {
    const updated_user = await update_user(req.params.id, req.body);

    if (!updated_user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updated_user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update_password_route = async (req, res) => {
  const { id } = req.params;
  const { old_password, new_password } = req.body;

  try {
    const msg = await update_password(id, old_password, new_password);
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

export {
  get_users_route,
  add_user_route,
  delete_user_route,
  update_user_route,
  update_password_route,
};
