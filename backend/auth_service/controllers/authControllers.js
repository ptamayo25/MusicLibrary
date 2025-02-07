exports.login = async (req, res) => {
  passport.authenticate("google", {
    scope: ["email", "profile"],
  });
};

exports.logout = async (req, res) => {
  res.send("Logout route");
};

exports.callback = async (req, res) => {
  res.send("Callback route");
};
