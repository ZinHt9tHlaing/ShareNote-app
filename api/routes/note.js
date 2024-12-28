const express = require("express");
const noteController = require("../controllers/note");
const { body } = require("express-validator");

const router = express.Router();

// GET /notes
router.get("/notes", noteController.getNotes);

// GET /notes/:id
router.get("/notes/:id", noteController.getDetailNote);

// POST /notes
router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title is too short!")
      .isLength({ max: 30 })
      .withMessage("Title is too long!"),
    body("content")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Content is too short!"),
  ],
  noteController.createNote
);

// DELETE /delete/:id
router.delete("/delete/:id",noteController.deleteNote)

module.exports = router;
