require("dotenv").config(); // Load environment variables from .env file
require("./passport"); // Import passport.js file
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Import file

const cookieSession = require("cookie-session");
const passport = require("passport");

// Google OAuth2 packages
// const { OAuth2Client } = require("google-auth-library");

//initialize express app
const app = express();
const PORT = process.env.PORT;

// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

//middleware setup
app.use(cors());
app.use(bodyParser.json());

//mount routes
app.use("/api/users", userRoutes);
app.use("/auth", userRoutes);

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

//Documentation for your reference for OAuth2 and Google APIs
// Console Cloud Google - https://console.cloud.google.com/
//1. Protocol for OAuth2 - Guide to using OAuth2
// https://developers.google.com/identity/protocols/oauth2
//2. Scopes - define of access to user data for Google APIs
// https://developers.google.com/identity/protocols/oauth2/scopes
//3. Send access token to an API in a Authorization request header
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

//Download OAuth2 configuration from Google
// const keys = require('./oauth2.keys.json');
// async function main() {
//   const oAuth2Client = await getAutheticatedClient(); // Getting the OAuth2 client
// }
//In controller.
// Test auth service is runing
// app.get("/", (req, res) => {
//   res.send("Auth Service is running.");
// });
// app.get("/auth/google", (req, res) => {
//   const authorizeUrl = client.generateAuthUrl({
//     access_type: "offline",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "openid",
//     ],
//   });
//   res.redirect(authorizeUrl);
// });

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "You are not logged in" });
});

app.get("/failed", (req, res) => {
  res.send("Failed");
});
app.get("/success", (req, res) => {
  res.send(`Welcome ${req.user.email}`);
});
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
    // scope: ["email", "profile", "openid"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
