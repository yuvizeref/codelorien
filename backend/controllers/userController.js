import {
  deleteUser,
  getUser,
  getUsers,
  saveUser,
  updatePassword,
  updateUser,
} from "../utils/userUtils.js";

export const getUserRoute = async (req, res) => {
  if (!req.user.admin && req.user.id !== req.params.userId) {
    return res.status(500).json({
      error: "You don't have permissions to fetch this user's details.",
    });
  }

  const { userId } = req.params;
  try {
    const user = await getUser(userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUsersRoute = async (req, res) => {
  const { showDeleted } = req.query;
  try {
    const users = await getUsers(showDeleted);
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const addUserRoute = async (req, res) => {
  try {
    const user = await saveUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUserRoute = async (req, res) => {
  const { userId } = req.params;
  const purge = req.query.purge ? req.query.purge : "true";

  try {
    const deleted = await deleteUser(userId, purge);

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

export const updateUserRoute = async (req, res) => {
  if (!req.user.admin && req.user.id !== req.params.userId) {
    return res
      .status(500)
      .json({ error: "You don't have permissions to edit this user." });
  }
  try {
    const updatedUser = await updateUser(
      req.params.userId,
      req.body,
      req.user.admin
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePasswordRoute = async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const msg = await updatePassword(userId, oldPassword, newPassword);
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};
