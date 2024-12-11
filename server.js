var express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3500;
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", function (req, res) {
  res.json({ user: "Srinjoy" });
});
module.exports = app;
