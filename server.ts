import { Application } from "express";
import connectDB from "./db/db";
import companyRoutes from "./routes/company/company.routes";

var express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3500;
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });

app.use(express.json());

app.use("/api/companies", companyRoutes);

module.exports = app;
