const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Company Ranking Backend!");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
