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

  //Successful tests
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

  test("should get all songs", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getSongs(req, res);
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        songs: expect.arrayContaining([
          expect.objectContaining({
            title: "Test Song",
            composer: "Test Composer",
          }),
        ]),
      })
    );
  });

  test("should get a song by id", async () => {
    const song = await Song.findOne({ title: "Test Song" });
    const req = {
      params: {
        id: song._id,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getSongById(req, res);
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        song: expect.objectContaining({
          title: "Test Song",
          composer: "Test Composer",
        }),
      })
    );
  });

  test("should update a song", async () => {
    const song = await Song.findOne({ title: "Test Song" });
    const req = {
      params: {
        id: song._id,
      },
      body: {
        composer: "Updated Song Composer",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateSong(req, res);
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Song updated successfully",
        song: expect.objectContaining({
          composer: "Updated Song Composer",
        }),
      })
    );
  });

  test("should delete a song", async () => {
    const song = await Song.findOne({ title: "Test Song" });
    const req = {
      params: {
        id: song._id,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteSong(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Song and associated data deleted successfully",
      })
    );
    await expect(Song.findOne({ title: "Test Song" })).resolves.toBeNull();
  });

  //Failure tests
  test("should not create a new song without required field of title", async () => {
    const req = {
      body: {
        composer: "Test Composer",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSong(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Title and composer are required",
      })
    );
  });

  test("should not create a new song without required field of composer", async () => {
    const req = {
      body: {
        title: "Test Song",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSong(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Title and composer are required",
      })
    );
  });

  test("should not get a song by id is not a valid ObjectID type", async () => {
    const req = {
      params: {
        id: "123456789012",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getSongById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Invalid ID format",
      })
    );
  });

  test("should not get a song by id if song not found", async () => {
    const song = new Song({
      title: "Test Song",
      composer: "Test Composer",
    });
    await song.save();
    const songToDelete = await Song.findOne({ title: "Test Song" });
    const req = {
      params: {
        id: songToDelete._id,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await Song.deleteOne({ _id: songToDelete._id });

    await getSongById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Song not found.",
      })
    );
  });

  test("should not update a song if song not found", async () => {
    const song = new Song({
      title: "Test Song",
      composer: "Test Composer",
    });
    await song.save();
    const songToDelete = await Song.findOne({ title: "Test Song" });
    const req = {
      params: {
        id: songToDelete._id,
      },
      body: {
        composer: "Updated Song Composer",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await Song.deleteOne({ _id: songToDelete._id });

    await updateSong(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Song not found",
      })
    );
  });

  test("should not delete song if id is not a valid ObjectID type", async () => {
    const req = {
      params: {
        id: "123456789012",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteSong(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Invalid song ID",
      })
    );
  });

  test("should not delete a song if song not found", async () => {
    const song = new Song({
      title: "Test Song",
      composer: "Test Composer",
    });
    await song.save();
    const songToDelete = await Song.findOne({ title: "Test Song" });
    const req = {
      params: {
        id: songToDelete._id,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await Song.deleteOne({ _id: songToDelete._id });

    await deleteSong(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Song not found",
      })
    );
  });
});
