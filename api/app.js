const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// route
const noteRoute = require("./routes/note");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

app.use(noteRoute);

// db connect
mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
