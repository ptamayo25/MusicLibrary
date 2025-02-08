exports.checkAdmin = (req, res, next) => {
  const user = req.user;
  console.log("User access", user.access);
  if (user.access === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden. Admin access required" });
  }
};

exports.checkSubAdmin = (req, res, next) => {
  const user = req.user;
  if (user.access === "Admin" || user.access === "Subadmin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden. Admin or Subadmin access required" });
  }
};
