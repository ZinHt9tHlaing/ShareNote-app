const { validationResult } = require("express-validator");

// models
const Note = require("../models/note");

exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.createNote = (req, res, next) => {
  const { title, content } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // true condition
    return res.status(400).json({
      message: "Validation failed.",
      errorMessage: errors.array(),
    });
  }

  Note.create({
    title,
    content,
  })
    .then((_) => {
      res.status(201).json({
        message: "Note created.",
        data: {
          title,
          content,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.getDetailNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};
