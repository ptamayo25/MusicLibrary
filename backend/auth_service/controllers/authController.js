require("dotenv").config();
const passport = require("passport");
require("../passport");
const User = require("../models/user");

const { register, login } = require("../controllers/userController");

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

      console.log("=============user=======================");
      console.log(user);
      console.log("====================================");
      try {
        //Check if user exists in database
        const userExists = await User.findOne({ email: user.emails[0].value });
        if (!userExists) {
          //If not, register user
          const newUser = {
            googleID: user.id,
            firstName: user.name.givenName,
            lastName: user.name.familyName,
            email: user.emails[0].value,
            access: "user",
            loggedIn: true,
          };
          await register(newUser, res);
        }

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
