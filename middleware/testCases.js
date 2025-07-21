import { body, validationResult } from "express-validator";

export const validateFiles = [
  body("output").notEmpty().withMessage("Output is required"),
  body("input").isString().withMessage("Input must be a string"),
  body("linesPerCase")
    .isInt({ min: 1 })
    .withMessage("linesPerCase must be a non-negative integer"),
];

export const validateTestCases = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
