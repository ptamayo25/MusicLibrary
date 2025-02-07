const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    access: { type: String, required: true },
    loggedIn: { type: Boolean, required: true },
  },
  { timestamps: true } //automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);
