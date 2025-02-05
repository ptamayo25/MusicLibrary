const User = require("../models/user"); // Import the User model

//Fake user data for testing purposes
const users = [
  {
    firstName: "Fake_John",
    lastName: "Doe",
    email: "john.doe@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_Daniel",
    lastName: "Brown",
    email: "daniel.brown@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Jessica",
    lastName: "Wilson",
    email: "jessica.wilson@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_David",
    lastName: "Martinez",
    email: "david.martinez@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Sarah",
    lastName: "Anderson",
    email: "sarah.anderson@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_James",
    lastName: "Taylor",
    email: "james.taylor@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Laura",
    lastName: "Thomas",
    email: "laura.thomas@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_Robert",
    lastName: "Harris",
    email: "robert.harris@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Megan",
    lastName: "Clark",
    email: "megan.clark@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_William",
    lastName: "Lewis",
    email: "william.lewis@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Emma",
    lastName: "Robinson",
    email: "emma.robinson@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_Alexander",
    lastName: "Walker",
    email: "alexander.walker@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Olivia",
    lastName: "Hall",
    email: "olivia.hall@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_Ethan",
    lastName: "Allen",
    email: "ethan.allen@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Sophia",
    lastName: "Young",
    email: "sophia.young@example.com",
    access: "subadmin",
  },
  {
    firstName: "Fake_Benjamin",
    lastName: "King",
    email: "benjamin.king@example.com",
    access: "user",
  },
  {
    firstName: "Fake_Isabella",
    lastName: "Wright",
    email: "isabella.wright@example.com",
    access: "subadmin",
  },
];

// Handle user registration TODO: implement oauth and token generation
exports.register = async (req, res) => {
  const { firstName, lastName, email, access } = req.body; // Extract name, email, and access from request

  try {
    const existingUser = await User.findOne({ email }); // Check if the user already exists
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // Return error if user exists
    }
    const user = new User({ firstName, lastName, email, access }); // Create a new user instance
    await user.save(); // Save the user to the database

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, firstName, lastName, email, access }, // Send user details in response
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message }); // Return error
  }
};

// Handle updating user access level
exports.updateAccess = async (req, res) => {
  const { email, access } = req.body; // Extract email and access from request

  try {
    const existingUser = await User.findOne({ email }); // Find the user by email
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" }); // Return error if user not found
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

//Handle getting all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    res
      .status(500)
      .json({ message: "Error getting all users", error: error.message });
  }
};

// OAuth with Google
//Documentation for your reference for OAuth2 and Google APIs
// Console Cloud Google - https://console.cloud.google.com/
//1. Protocol for OAuth2 - https://developers.google.com/identity/protocols/oauth2
//2. Scopes - define access->user data for Google APIs - https://developers.google.com/identity/protocols/oauth2/scopes
//3. Send access token to an API in a Authorization request header
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

// 1. Auth service directs to Google OAuth: getting user's email, profile, and openid
exports.googleAuth = async (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
  });
  res.redirect(url);
};

// 2. Google redirects back to auth service
exports.googleAuthCallback = async (req, res) => {
  const { code } = req.query; // Code from Google to exchange for tokens
  if (!code) {
    return res.status(401).send("Code not provided");
  }
  try {
    const { tokens } = await client.getToken(code);
    req.session.tokens = tokens;
    res.redirect("http://localhost:5173/musicLibrary");
  } catch (error) {
    res.status(500).send("Error during authenticaiton");
  }
};
// 3. Getting user info and check if user is authenticated
exports.googleGetUser = async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).send("User not authenticated");
  }
  client.setCredentials(req.session.tokens);
  const userInfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
  });
  res.send(userInfo.data);
};

// TODO: Implemet user logout
// exports.logout = async (req, res) => {
//   try {
//     // Will add more here later...
//     // Clear the session

//     res.status(200).json({ message: "User logged out successfully" });
//   } catch (error) {
//     console.error("Error logging out", error);
//     res.status(500).json({ message: "Failed to log out" });
//   }
// };

// TODO: Implement delete user
