const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema

//stretch goal: PJT to add fuzzy search capability (for misspelled words)

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words } = req.body;

    console.log("request body", req.body);

    if (words === null || !sortType) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    if (words.trim() === "") {
      const allSongs = await Song.find();
      return res.json(sortResults(allSongs, sortType));
    }

    const songsByTitle = await Song.find({
      title: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songByComposer = await Song.find({
      composer: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songsByLyrics = await Song.find({
      lyrics: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songsByKeywords = await Song.find({
      keywords: { $regex: words.trim(), $options: "i" },
    }).exec();
    const songs = [
      ...songsByTitle,
      ...songByComposer,
      ...songsByLyrics,
      ...songsByKeywords,
    ];

    if (songs.length === 0) {
      return [];
    }
    res.json(sortResults(songs, sortType));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function sortResults(songs, sortType) {
  // TODO write sorting algorithm
  return songs;
}
