const mongoose = require("mongoose");
const Song = require("../models/song"); //update if Nancy changes name of schema
const Fuse = require("fuse.js");

//function returning all songs with words in title, composer, lyrics, or keywords
exports.getSongsBySearch = async (req, res) => {
  try {
    const { words, themes } = req.body;
    console.log("Request: ", req.body);

    if (words === null || !themes) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    //sanitize input
    const allowedCharacters = /^[a-zA-Z0-9\s]+$/;
    const sanitizedWords = words
      .trim() // remove leading and trailing spaces
      .split("") // split into characters
      .filter((char) => allowedCharacters.test(char)) // remove characters that are not allowed
      .join("") // join the characters back together
      .replace(/\s+/g, " "); //replace multiple spaces with single space so tha query works for regex

    if (sanitizedWords === "" && themes.length !== 0) {
      const allSongsThemes = await Song.find({
        themes: { $in: themes },
      }).exec();
      return res.json(allSongsThemes);
    }

    let allSongs = await Song.find().exec();

    if (sanitizedWords === "" && themes.length === 0) {
      return res.json(allSongs);
    }

    //If themes are specified, filter the songs by themes
    if (themes.length > 0) {
      allSongs = allSongs.filter((song) =>
        song.themes.some((theme) => themes.includes(theme))
      );
    }

    const fuse = new Fuse(allSongs, {
      keys: ["title", "composer", "lyrics", "keywords"],
      threshold: 0.3,
    });

    const songs = fuse.search(sanitizedWords).map((result) => result.item);

    // const excludedIdValues = [];

    // const buildQuery = (field) => {
    //   const query = {
    //     [field]: { $regex: sanitizedWords, $options: "i" },
    //     _id: { $nin: excludedIdValues }, //exclude songs already found
    //   };
    //   if (themes.length > 0) {
    //     query.themes = { $in: themes };
    //   }
    //   return query;
    // };

    // const searchFields = ["title", "composer", "lyrics", "keywords"];

    // const songsResults = [];

    // for (const field of searchFields) {
    //   const songs = await Song.find(buildQuery(field)).exec();
    //   excludedIdValues.push(...songs.map((song) => song._id.toString()));
    //   songsResults.push(...songs);
    // }

    console.log("Songs found: ", songs);
    return res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


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


// function sortResults(songs, sortType) {
//   switch (sortType) {
//     case "composerA-Z":
//       return songs.sort((a, b) => {
//         if (a.composer === "N/A") return 1;
//         if (b.composer === "N/A") return -1;
//         return a.composer.toLowerCase() > b.composer.toLowerCase() ? 1 : -1;
//       });

//     case "composerZ-A":
//       return songs.sort((a, b) => {
//         if (a.composer === "N/A") return 1;
//         if (b.composer === "N/A") return -1;
//         return a.composer.toLowerCase() < b.composer.toLowerCase() ? 1 : -1;
//       });

//     case "titleA-Z":
//       return songs.sort((a, b) => {
//         if (a.title === "N/A") return 1;
//         if (b.title === "N/A") return -1;
//         return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
//       });

//     case "titleZ-A":
//       return songs.sort((a, b) => {
//         if (a.title === "N/A") return 1;
//         if (b.title === "N/A") return -1;
//         return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
//       });

//     case "mostRecent":
//       return songs.sort((a, b) => {
//         if (!a.lastPerformed) return 1;
//         if (!b.lastPerformed) return -1;
//         return new Date(b.lastPerformed) - new Date(a.lastPerformed);
//       });

//     case "leastRecent":
//       return songs.sort((a, b) => {
//         if (!a.lastPerformed) return 1;
//         if (!b.lastPerformed) return -1;
//         return new Date(a.lastPerformed) - new Date(b.lastPerformed);
//       });

//     default:
//       return songs;
//   }
// }


