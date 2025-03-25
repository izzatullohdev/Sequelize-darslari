const { body, validationResult } = require("express-validator");
const userValidationRules = () => [
  body("username")
    .notEmpty()
    .withMessage("Username bo‘sh bo‘lishi mumkin emas")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username 3 dan 20 belgidan iborat bo‘lishi kerak"),
  body("email")
    .notEmpty()
    .withMessage("Email bo‘sh bo‘lishi mumkin emas")
    .isEmail()
    .withMessage("Email formatini tekshiring"),
];

// Error handler Middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const extractedErrors = errors.array().map((err) => ({
    field: err.param,
    message: err.msg,
  }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = { userValidationRules, validate };
