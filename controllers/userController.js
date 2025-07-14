import {
  deleteUser,
  getUsers,
  saveUser,
  updatePassword,
  updateUser,
} from "../utils/userUtils.js";

const getUsersRoute = async (req, res) => {
  const { showDeleted } = req.query;
  try {
    const users = await getUsers(showDeleted);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const addUserRoute = async (req, res) => {
  try {
    const user = await saveUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUserRoute = async (req, res) => {
  const { id } = req.params;
  const { purge } = req.query;

  try {
    const deleted = await deleteUser(id, purge === "true");

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

const updateUserRoute = async (req, res) => {
  try {
    const updatedUser = await updateUser(
      req.params.id,
      req.body,
      req.user.admin
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePasswordRoute = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const msg = await updatePassword(id, oldPassword, newPassword);
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

export {
  getUsersRoute,
  addUserRoute,
  deleteUserRoute,
  updateUserRoute,
  updatePasswordRoute,
};
