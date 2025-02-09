//package imports
require("dotenv").config(); // Load environment variables from .env file
const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const url = require("url");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

//file imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes.js");
require("./passport");

//initialize express app
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ Allow only your frontend
    credentials: true, // ✅ Allow cookies to be sent
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Test auth service is runing
app.get("/", (req, res) => {
  res.send("Auth Service is running.");
});

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

//mount routes
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

// Google Auth
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
