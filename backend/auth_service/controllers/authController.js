require("dotenv").config();
const passport = require("passport");
require("../passport");

exports.login = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.logout = async (req, res) => {
  res.send("Logout route");
};

exports.failed = async (req, res) => {
  res.send("Failed");
};

// exports.success = async (req, res) => {
//   res.send(`Welcome!`);
// };

exports.callback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/auth/failed" },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect("/auth/failed");

      console.log("=============user=======================");
      console.log(user);
      console.log("====================================");

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect(process.env.FRONTEND_URL);
      });
    }
  )(req, res, next);
};
