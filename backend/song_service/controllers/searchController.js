const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words } = req.body;
    const songsByTitle = await Song.find({
      title: { $regex: words, $options: "i" },
    }).exec();
    const songByComposer = await Song.find({ composer: composer }).exec();
    const songsByLyrics = await Song.find({
      lyrics: { $regex: wordsInLyrics, $options: "i" },
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
    res.json(sortResults(songs, sortType));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function sortResults(songs, sortType) {
  // TODO write sorting algorithm
  return null;
}
