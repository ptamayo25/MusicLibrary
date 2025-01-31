const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema

//stretch goal: PJT to add fuzzy search capability (for misspelled words)

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words } = req.body;
    const songsByTitle = await Song.find({
      title: { $regex: words, $options: "i" },
    }).exec();
    const songByComposer = await Song.find({
      composer: { $regex: words, $options: "i" },
    }).exec();
    const songsByLyrics = await Song.find({
      lyrics: { $regex: words, $options: "i" },
    }).exec();
    const songsByKeywords = await Song.find({
      keywords: { $regex: words, $options: "i" },
    }).exec();
    const songs = [
      ...songsByTitle,
      ...songByComposer,
      ...songsByLyrics,
      ...songsByKeywords,
    ];
    if (songs.length === 0) {
      res.status(404).json({ message: "No songs found" });
    }
    res.json(sortResults(songs, sortType));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function sortResults(songs, sortType) {
  // TODO write sorting algorithm
  return null;
}
