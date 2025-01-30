const test = [
  {
    id: 1,
    title: "Test Title",
    composer: "Test Composer",
    voicing: "Test Voicing",
    duration: "Test Duration",
    arranger: "Test Arranger",
    datePerformed: "Test Date Performed",
  },
];

exports.getUserById = async (req, res) => {
  try {
    const testId = await parseInt(req.params.id);
    const test = test.find((test) => test.id === testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
