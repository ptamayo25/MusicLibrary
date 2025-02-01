require("dotenv").config(); // Load environment variables from .env file

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Auth Service is running.");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
