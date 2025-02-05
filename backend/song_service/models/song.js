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
  themes: [String],
});

// Indexes for optimized queries
songSchema.index({ title: "text" }); // Enables full-text search on the title field
songSchema.index({ composer: "text" }); // Enables full-text search on the composer field
songSchema.index({ keywords: "text" }); // Enables full-text search on the keywords field
songSchema.index({ lyrics: "text" }); // Enables full-text search on the lyrics field
songSchema.index({ themes: 1 }); // Optimizes queries that filter by themes
songSchema.index({ title: "text", themes: 1 }); // Optimizes queries that filter by title and themes
songSchema.index({ composer: "text", themes: 1 }); // Optimizes queries that filter by composer and themes
songSchema.index({ lyrics: "text", themes: 1 }); // Optimizes queries that filter by lyrics and themes
songSchema.index({ keywords: "text", themes: 1 }); // Optimizes queries that filter by keywords and themes

songSchema.index({ lastPerformed: 1 }); // Optimizes queries that sort by lastPerformed
songSchema.index({ title: 1 }); // Optimizes queries that sort by title
songSchema.index({ composer: 1 }); // Optimizes queries that sort by composer



module.exports = mongoose.model("song", songSchema);
