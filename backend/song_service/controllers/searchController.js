const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema
const song = require("../models/song");
// const { ObjectId } = mongoose.Types;

//stretch goal: PJT to add fuzzy search capability (for misspelled words)

//function returning all songs with words in title
exports.getSongsBySearch = async (req, res) => {
  try {
    const { sortType, words, themes } = req.body;
    console.log("Request body: ", req.body);

    if (words === null || !sortType || !themes) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    if (words.trim() === "" && themes.length === 0) {
      const allSongs = await Song.find();
      return res.json(sortResults(allSongs, sortType));
    }

    if (words.trim() === "" && themes.length !== 0) {
      const allSongsThemes = await Song.find({
        themes: { $in: themes },
      }).exec();
      return res.json(sortResults(allSongsThemes, sortType));
    }

    const excludedIdValues = [];

    const buildQuery = (field) => {
      const query = {
        [field]: { $regex: words.trim(), $options: "i" },
        _id: { $nin: excludedIdValues }, //exclude songs already found
      };
      if (themes.length > 0) {
        query.themes = { $in: themes };
      }
      return query;
    };

    const searchFields = ["title", "composer", "lyrics", "keywords"];

    const songsResults = [];

    for (const field of searchFields) {
      const songs = await Song.find(buildQuery(field)).exec();
      excludedIdValues.push(...songs.map((song) => song._id.toString()));
      songsResults.push(...songs);
    }

    // const songsByTitle = await Song.find(buildQuery("title")).exec();
    // excludedIdValues.push(...songsByTitle.map((song) => song._id));

    // const songsByComposer = await Song.find(query("composer")).exec();
    // excludedIdValues.push(...songsByComposer.map((song) => song._id));

    // const songsByLyrics = await Song.find(query("lyrics")).exec();
    // excludedIdValues.push(...songsByLyrics.map((song) => song._id));

    // const songsByKeywords = await Song.find(query("keywords")).exec();

    // const songs = [
    //   ...songsByTitle,
    //   ...songsByComposer,
    //   ...songsByLyrics,
    //   ...songsByKeywords,
    // ];

    // const uniqueSongs = [];

    // songs.forEach((song) => {
    //   console.log("SongID: ", song._id);
    //   for (let i = 0; i < uniqueSongs.length; i++) {
    //     if (uniqueSongs[i]._id.equals(song._id)) {
    //       return;
    //     }
    //   }
    //   uniqueSongs.push(song);
    // });

    // console.log("Unique songs found: ", uniqueSongs);

    // if (uniqueSongs.length === 0) {
    //   return res.json(uniqueSongs); //return empty array if no songs found
    // }
    console.log("Songs found: ", songsResults);
    return res.json(songsResults);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function sortResults(songs, sortType) {
  switch (sortType) {
    case "composerA-Z":
      return songs.sort((a, b) => {
        if (a.composer === "N/A") return 1;
        if (b.composer === "N/A") return -1;
        return a.composer.toLowerCase() > b.composer.toLowerCase() ? 1 : -1;
      });

    case "composerZ-A":
      return songs.sort((a, b) => {
        if (a.composer === "N/A") return 1;
        if (b.composer === "N/A") return -1;
        return a.composer.toLowerCase() < b.composer.toLowerCase() ? 1 : -1;
      });

    case "titleA-Z":
      return songs.sort((a, b) => {
        if (a.title === "N/A") return 1;
        if (b.title === "N/A") return -1;
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      });

    case "titleZ-A":
      return songs.sort((a, b) => {
        if (a.title === "N/A") return 1;
        if (b.title === "N/A") return -1;
        return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
      });

    case "mostRecent":
      return songs.sort((a, b) => {
        if (!a.lastPerformed) return 1;
        if (!b.lastPerformed) return -1;
        return new Date(b.lastPerformed) - new Date(a.lastPerformed);
      });

    case "leastRecent":
      return songs.sort((a, b) => {
        if (!a.lastPerformed) return 1;
        if (!b.lastPerformed) return -1;
        return new Date(a.lastPerformed) - new Date(b.lastPerformed);
      });

    default:
      return songs;
  }
}


//function for returning all themes in the database
exports.getThemes = async (req, res) => {
  console.log("Getting themes...");
  try {
    const uniqueThemes = await Song.distinct("themes");
    const themes = uniqueThemes.filter(
      (theme) => theme !== null && theme !== undefined
    );
    console.log("Themes found: ", themes);
    res.json({ themes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
