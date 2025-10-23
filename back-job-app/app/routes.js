const express = require("express");
const router = express.Router();
const JobInfo = require("./models/JobInformationModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

router.get("/users", (req, res) => {
  res.json([{ id: 1, test: "wheee" }]);
});

router.get("/jobs", async (req, res) => {
  try {
    // I'll have to change this later to take in a user id if I want to add that functionality.
    const limit = 25;
    const lastJobId = req.query.lastJobId ? req.query.lastJobId : null;

    let query = lastJobId
      ? { _id: { $lt: new mongoose.Types.ObjectId(lastJobId) } }
      : {};

    let jobs = await JobInfo.find(query)
      .select(`-job_description -other`)
      .sort({ _id: -1 })
      .limit(limit);

    const hasMore = jobs.length === limit;
    const nextJobId = hasMore ? jobs[jobs.length - 1]._id : null;

    res.status(200).json({
      success: true,
      jobs: jobs,
      message: "Successfully fetched job information",
      nextExpectedId: nextJobId,
    });
  } catch (err) {
    console.error(`error in jobs fetch :`, err);
    res.status(500).json({ success: false, message: "Oh meow..." });
  }
});

router.delete("/delete-job/:id", async (req, res) => {
  const jobId = req.params.id || "";
  try {
    res.status(200).json({ success: true, message: "You deleted them!" });
  } catch (err) {
    console.error(`error in delete jobs: `, err);
    res.status(500).json({ success: false, message: "oh meow meow" });
  }
});

module.exports = router;
