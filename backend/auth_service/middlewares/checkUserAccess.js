exports.checkAdmin = (req, res, next) => {
  const user = req.user;
  if (user.access === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden. Admin access required" });
  }
};

exports.checkSubAdmin = (req, res, next) => {
  const user = req.user;
  if (user.access === "admin" || user.access === "subadmin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden. Admin or Subadmin access required" });
  }
};
