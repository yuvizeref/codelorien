import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authenticate.js";
import { userAddValidations, validateUserAdd } from "../middleware/user.js";
import {
  addUserRoute,
  deleteUserRoute,
  getUsersRoute,
  updatePasswordRoute,
  updateUserRoute,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, authorizeAdmin, getUsersRoute);

userRouter.post("/", userAddValidations, validateUserAdd, addUserRoute);

userRouter.delete("/:userId", authenticate, authorizeAdmin, deleteUserRoute);

userRouter.patch("/:userId", authenticate, updateUserRoute);

userRouter.patch("/:userId/password", updatePasswordRoute);

export default userRouter;
