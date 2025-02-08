const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookie

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized. Token missing in request" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Find user by ID from token
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found" });
    }
    req.user = user; // Attach user to request object

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid or Expired token" });
  }
};

module.exports = verifyJWT;
