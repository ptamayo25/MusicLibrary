require("dotenv").config();
const passport = require("passport");
require("../passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/userController");

exports.login = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.logout = async (req, res) => {
  try {
    await req.logout();
    res.clearCookie("token"); // Clear the token from cookies
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error during logout" });
  }
};

exports.failed = async (req, res) => {
  res.redirect(process.env.ERROR_PAGE_URL);
};

exports.callback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/auth/failed" },
    async (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect("/auth/failed");
      try {
        //Check if user exists in database
        const userExists = await User.findOne({ email: user.emails[0].value });
        if (!userExists) {
          //If not, register user
          const newUser = {
            firstName: user.name.givenName,
            lastName: user.name.familyName,
            email: user.emails[0].value,
            access: "User",
          };
          const didRegister = await register(newUser, res);
          if (!didRegister) {
            console.log("Registration failed");
            new Error("Registration failed");
          }
        }

        //Generate JWT token and send it to the client
        userInDatabase = await User.findOne({ email: user.emails[0].value });

        console.log("id", userInDatabase._id);
        const token = jwt.sign(
          { userId: userInDatabase._id }, // Use the user ID from the database
          process.env.JWT_SECRET, // Use a secret key from your environment variables
          { expiresIn: "14d" } // Token expires in 14 days
        );

        console.log("JWT Token generated:", token); // Log the token for debugging

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        }); // Set the cookie with the token

        //Log user in on database
        const didLogin = await login(user, res);
        if (!didLogin) {
          console.log("Login failed");
          new Error("Login failed");
        }
      } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error with login" });
      }
      //Log user in on session and redirect to frontend
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect(process.env.FRONTEND_URL);
      });
    }
  )(req, res, next);
};
