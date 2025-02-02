const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Post title
  composer: { type: String, required: true }, // Post content
  arranger: { type: String },
  copies: { type: Number },
  voicing: { type: String },
  instrumentation: { type: String },
  keywords: [String],
  lyrics: { type: String },
  lastPerformed: { type: Date },
  comments: { String },
});

// TODO PJT: Add indexes for search fields to make search faster

module.exports = mongoose.model("song", songSchema);
