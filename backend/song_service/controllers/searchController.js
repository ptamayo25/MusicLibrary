const mongoose = require("mongoose");
const Song = require("../models/song");



//function returning all songs with words in title
exports.getSongsByTitle = async (req, res) => {
  try {
    const wordsInTitle = req.params.wordsInTitle;
    const songs = await Song.find({ title: { $regex: wordsInTitle, $options: "i" } }).exec();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//function returning all songs by a specific composer
exports.getSongsByComposer = async (req, res) => {
  try {
    const composer = req.params.composer;
    const songs = await Song.find({ composer: composer }).exec();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//function returning all songs with words in lyrics
exports.getSongsByLyrics = async (req, res) => {
  try {
    const wordsInLyrics = req.params.wordsInLyrics;
    const songs = await Song.find({ lyrics: { $regex: wordsInLyrics, $options: "i" } }).exec();
    res.json(songs); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//function returning all songs with words in keywords
exports.getSongsByKeywords(words) = async (req, res) => {
  try {
    const words = req.params.words;
    const songs = await Song.find({ keywords: { $regex: words, $options: "i" } }).exec();
    res.json(songs); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};