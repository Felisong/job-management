const express = require("express");
const router = express.Router();
const JobInfo = require("./models/JobInformationModel");
// Import models (I'll need to create these)
// const Skills = require('./models/Skills');

router.get("/users", (req, res) => {
  res.json([{ id: 1, test: "wheee" }]);
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await JobInfo.find();
    // paginate this later for optimization reasons, itll be too slow. so if i load 10 at a time, look into what lazy loading is maybe
    res.status(200).json({
      success: true,
      jobs: jobs,
      message: "Successfully fetched job information",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Oh meow..." });
  }
});

module.exports = router;
