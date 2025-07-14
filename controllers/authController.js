import { generateToken } from "../utils/commonUtils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const loginRoute = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername },
      ],
    });

    if (!user || user.deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.admin);

    const userObj = user.toObject();

    delete userObj.password;

    res.status(200).json({ token, user: userObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logoutRoute = async (req, res) => {
  // TODO : Store and invalidate the token ?
  res
    .status(200)
    .json({ message: "Successfully logged out. Please discard your token." });
};

export { loginRoute, logoutRoute };
