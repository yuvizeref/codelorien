import { generate_token } from "../utils/common_utils.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

const login_route = async (req, res) => {
  const { email_or_username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { email: email_or_username.toLowerCase() },
        { username: email_or_username },
      ],
    });

    if (!user || user.deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    const is_match = await bcrypt.compare(password, user.password);

    if (!is_match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generate_token(user._id);

    const user_obj = user.toObject();

    delete user_obj.password;

    res.status(200).json({ token, user: user_obj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout_route = async (req, res) => {};

export { login_route, logout_route };
