const checkAdmin = (req, res, next) => {
  const user = req.user;
  console.log("User access", user.access);
  if (user.access === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden. Admin access required" });
  }
};

module.exports = checkAdmin;
