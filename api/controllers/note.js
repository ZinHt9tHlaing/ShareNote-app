const { validationResult } = require("express-validator");

// models
const Note = require("../models/note");

// utils
const { unlink } = require("../utils/unlink");

exports.getNotes = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 4;
  let totalNotes;
  let totalPages;

  Note.find()
    .countDocuments()
    .then((counts) => {
      totalNotes = counts;
      // totalNotes => 12
      // 12 / 6 => 2
      totalPages = Math.ceil(totalNotes / perPage);
      return Note.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((notes) => {
      return res.status(200).json({ notes, totalNotes, totalPages });
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
  const cover_image = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // true condition
    return res.status(400).json({
      message: "Validation failed.",
      errorMessages: errors.array(),
    });
  }

  Note.create({
    title,
    content,
    cover_image: cover_image ? cover_image.path : "",
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

exports.getOldNote = (req, res, next) => {
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

exports.updateNote = (req, res, next) => {
  const { note_id, title, content } = req.body;

  Note.findById(note_id)
    .then((note) => {
      note.title = title;
      note.content = content;
      return note.save();
    })
    .then(() => {
      return res.status(200).json({
        message: "Note Updated!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};

exports.deleteNote = (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((note) => {
      return res.status(204).json({
        message: "Note deleted.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong",
      });
    });
};
