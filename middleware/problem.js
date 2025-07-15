import { body, validationResult } from "express-validator";
import { difficulties } from "../utils/enums.js";

const problemAddValidations = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("difficulty")
    .isIn(difficulties)
    .withMessage(`Difficulty must be one of: ${difficulties.join(", ")}`),
];

const validateProblemAdd = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { problemAddValidations, validateProblemAdd };
