import { body, validationResult } from "express-validator";

export const validateFiles = [
  body("output").exists().withMessage("Output is required"),
  body("input").exists().withMessage("Input is required"),
  body("linesPerCase").exists().withMessage("linesPerCase is required"),
];

export const validateTestCases = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
