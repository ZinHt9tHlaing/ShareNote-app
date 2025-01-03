const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// controller
const authController = require("../controllers/auth");

// models
const User = require("../models/user");

// POST /register
router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username is too short!")
      .isLength({ max: 10 })
      .withMessage("Username is too long!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDocument) => {
          if (userDocument) {
            return Promise.reject("Username is already existed!");
          }
        });
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email format!")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((emailDocument) => {
          if (emailDocument) {
            return Promise.reject("E-mail already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password is too short!"),
  ],
  authController.register
);

// POST /login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email format!")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password is too short!"),
  ],
  authController.login
);

module.exports = router;
