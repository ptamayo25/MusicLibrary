const mongoose = require("mongoose");
require("dotenv").config();
const Song = require("../models/song");
const {
  createSong,
  createManySongs,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

describe("Song Controller tests", () => {
  beforeAll(async () => {
    console.log("MONGO_URI", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterAll(async () => {
    // Clean up the database after each test
    await Song.deleteMany({ title: "Test Song" });
    // Close the connection after all tests are done
    await mongoose.connection.close();
  });

  test("should create a new song", async () => {
    const req = {
      body: {
        title: "Test Song",
        composer: "Test Composer",
        arranger: "Test Arranger",
        copies: 5,
        voicing: "SATB",
        instrumentation: "Piano",
        keywords: ["test", "song"],
        lyrics: "Test lyrics",
        comments: "Test comments",
        lastPerformed: "2023-01-01",
        themes: ["test"],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSong(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Song created successfully",
        song: expect.objectContaining({
          title: "Test Song",
          composer: "Test Composer",
          arranger: "Test Arranger",
          copies: 5,
          voicing: "SATB",
          instrumentation: "Piano",
          keywords: ["test", "song"],
          lyrics: "Test lyrics",
          comments: "Test comments",
          lastPerformed: new Date("2023-01-01"),
          themes: ["test"],
        }),
      })
    );
  });

  //   test("should get all songs", async () => {
  //     const req = {};
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     await getSongs(req, res);
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalled();
  //   });
});
