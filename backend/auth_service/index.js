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

const userRoutes = require("./routes/userRoutes"); //file imports
const authRoutes = require("./routes/authRoutes.js");
require("./passport");

const app = express();
const PORT = process.env.PORT;

app.use(
  //middleware
  cors({
    origin: process.env.FRONTEND_URL, // ✅ Allow only your frontend
    credentials: true, // ✅ Allow cookies to be sent
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  // Test auth service is runing
  res.send("Auth Service is running.");
});

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

app.use("/api/users", userRoutes); //mount routes
app.use("/auth", authRoutes);

app.use(
  // Google Auth
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.DEPLOY_AWS_LAMBDA === true) {
  //Deploy to AWS Lambda
  const serverless = require("serverless-http");
  module.exports.handler = serverless(app);
} else {
  app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
  });
}
