const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    access: { type: String, required: true },
  },
  { timestamps: true } //automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);
