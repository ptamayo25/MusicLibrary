//package imports
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//file imports
const userRoutes = require("./routes/userRoutes");

//initialize express app
const app = express();
const PORT = process.env.PORT;

//middleware setup
app.use(cors());
app.use(bodyParser.json());

//mount routes
app.use("/api/users", userRoutes);

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Auth Service connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
