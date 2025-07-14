import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const authenticate = (req, res, next) => {
  const auth_header = req.headers.authorization;

  if (!auth_header || !auth_header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = auth_header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authorize_admin = (req, res, next) => {
  if (!req.user?.admin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

const validate_login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { authenticate, authorize_admin, validate_login };
