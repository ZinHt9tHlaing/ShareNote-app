const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // true condition
    return res.status(400).json({
      message: "Validation failed.",
      errorMessage: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        password: hashedPassword,
      });
    })
    .then((result) => {
      res.status(201).json({
        message: "User created.",
        userId: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Something went wrong." });
    });
};

exports.login = (req, res, next) => {};
