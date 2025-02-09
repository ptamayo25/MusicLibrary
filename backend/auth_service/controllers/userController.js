const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import the User model

// Handle getting all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Getting all users");
    const allUsers = await User.find(); // Find all users in the database
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" }); // Return error if no users found
    }
    res.status(200).json(allUsers); // Send response with all users
  } catch (error) {
    console.error("Error getting all users:", error);
    res
      .status(500)
      .json({ message: "Error getting all users", error: error.message }); // Return error
  }
};

// Handle getting a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params; // Extract user ID from request

  try {
    const user = await User.findById(id); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return error if user not found
    }

    res.status(200).json(user); // Send response with user details
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res
      .status(500)
      .json({ message: "Error getting user by ID", error: error.message }); // Return error
  }
};

// Handle user registration TODO: implement oauth and token generation
exports.register = async (newUser, res) => {
  // console.log("Request passed to Register", req);
  const { firstName, lastName, email, access } = newUser; // Extract name, email, and access from request

  try {
    const existingUser = await User.findOne({ email }); // Check if the user already exists
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Verify email." }); // Return error if user exists
    }
    const user = new User({
      firstName,
      lastName,
      email,
      access,
    }); // Create a new user instance
    await user.save(); // Save the user to the database
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

// Handle user registration for multiple users (for faking data purposes)
exports.registerMany = async (req, res) => {
  try {
    const newUsers = await User.insertMany(users); // Insert multiple users into the database
    if (!newUsers) {
      return res
        .status(500)
        .json({ message: "Error registering multiple users" }); // Return error if users not created
    }
    res.status(201).json({ message: "Users registered successfully" }); // Send success message
  } catch (error) {
    console.error("Error registering multiple users:", error);
    res.status(500).json({ message: "Error registering multiple users" }); // Return error
  }
};

// Handle updating user access level for a single user
exports.updateAccessOne = async (req, res) => {
  const { email, access } = req.body; // Extract email and access from request

  try {
    const existingUser = await User.findOne({ email }); // Find the user by email
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found to update access" }); // Return error if user not found
    }
    existingUser.access = access; // Update the user's access level
    await existingUser.save(); // Save the updated user to the database

    res.status(200).json({
      message: "User access updated successfully",
      user: { id: existingUser._id, email, access }, // Send user details in response
    });
  } catch (error) {
    console.error("Error updating user access:", error);
    res
      .status(500)
      .json({ message: "Error updating user access", error: error.message }); // Return error
  }
};

//Handle updating user access level for multiple users
exports.updateAccessMany = async (req, res) => {
  const usersToUpdate = req.body; // Extract users to update from request

  try {
    const updatedUsers = await Promise.all(
      usersToUpdate.map(async (user) => {
        const { email, access } = user;
        const existingUser = await User.findOne({ email }); // Find the user by email
        if (!existingUser) {
          return { email, message: "User not found to update access" }; // Return error if user not found
        }
        existingUser.access = access; // Update the user's access level
        await existingUser.save(); // Save the updated user to the database

        return { email, message: "User access updated successfully" }; // Return success message
      })
    );

    res.status(200).json({ updatedUsers }); // Send response with updated users
  } catch (error) {
    console.error("Error updating user access:", error);
    res
      .status(500)
      .json({ message: "Error updating user access", error: error.message }); // Return error
  }
};

// TODO: Implement user login
exports.login = async (user, res) => {
  try {
    if (!user) {
      return res.status(400).json({ message: "User not found" }); // Return error if user not found
    }
    await User.findOneAndUpdate(
      { email: user.emails[0].value }, // Find the user by email
      { loggedIn: true } // Update the user's loggedIn status
    );
    return true;
  } catch (error) {
    console.error("Error logging in user:", error);
    return false;
  }
};

// Handle deleting a single user by ID
exports.deleteOne = async (req, res) => {
  const { id } = req.params; // Extract user ID from request

  try {
    const user = await User.findByIdAndDelete(id); // Find and delete the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found to delete" }); // Return error if user not found
    }
    res.status(200).json({ message: "User deleted successfully" }); // Send success message
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message }); // Return error
  }
};

// Handle getting a user's access level from decoding jwt token in cookie to get user ID and finding user in database
exports.getAccess = async (req, res) => {
  const token = req.cookies.token; // Get token from cookie

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized. Token missing in request" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.userId); // Find the user by ID
    console.log("USER", user); // Log the user
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return error if user not found
    }
    res.status(200).json({ access: user.access }); // Send response with user's access level
  } catch (error) {
    console.error("Error getting user access:", error);
    res
      .status(500)
      .json({ message: "Error getting user access", error: error.message }); // Return error
  }
};
