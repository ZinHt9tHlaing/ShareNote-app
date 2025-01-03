const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: { type: String, require: true },

  // database relationship ( users & notes connection)
  notes: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
