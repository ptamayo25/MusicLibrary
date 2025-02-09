const checkSubadmin = (req, res, next) => {
  const user = req.user;
  console.log("User access", user.access);
  if (user.access === "Admin" || user.access === "Subadmin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden. Admin or Subadmin access required" });
  }
};

module.exports = checkSubadmin;
