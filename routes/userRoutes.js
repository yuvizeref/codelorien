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

userRouter.delete("/:id", authenticate, authorizeAdmin, deleteUserRoute);

userRouter.patch("/:id", authenticate, updateUserRoute);

userRouter.patch("/:id/password", updatePasswordRoute);

export default userRouter;
