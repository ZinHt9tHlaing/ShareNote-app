const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
    },
    author: {
      type: String,
      default: "Anonymous",
    },
  },
  {
    timestamps: true,
  }
);

const nodeModel = model("Note", noteSchema);
module.exports = nodeModel;
