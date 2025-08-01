import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user?.admin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export const loginValidations = [
  body("emailOrUsername")
    .notEmpty()
    .withMessage("Provide a valid email address or user name"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
