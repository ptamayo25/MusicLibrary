require("dotenv").config();
const passport = require("passport");
require("../passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { register, login } = require("../controllers/userController");
const { max } = require("pg/lib/defaults");

exports.login = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.logout = async (req, res) => {
  res.send("Logout route");
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
          await register(newUser, res);
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
        await login(user, res);
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
