const { body, validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    next(new AppError(JSON.stringify(extractedErrors), 400));
  };
};

const postValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title must be under 200 characters"),
  body("content").trim().notEmpty().withMessage("Content is required"),
];

const commentValidation = [
  body("text").trim().notEmpty().withMessage("Comment text is required"),
  body("authorName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Author Name must be under 100 characters"),
];

const userValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = {
  validate,
  postValidation,
  commentValidation,
  userValidation,
};
