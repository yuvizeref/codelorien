import { check, validationResult } from "express-validator";

export const validateFiles = [
  check("input").custom((value, { req }) => {
    if (!req.files || !req.files.input) {
      throw new Error("Input file is required.");
    }
    return true;
  }),
  check("output").custom((value, { req }) => {
    if (!req.files || !req.files.output) {
      throw new Error("Output file is required.");
    }
    return true;
  }),
];

export const validateFileUpload = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
