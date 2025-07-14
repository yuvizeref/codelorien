import { validationResult } from "express-validator";
const validate_user_add = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { validate_user_add };
