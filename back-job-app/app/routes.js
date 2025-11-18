const express = require("express");
const router = express.Router();
const JobInfo = require("./models/JobInformationModel");
const mongoose = require("mongoose");

router.get("/users", (req, res) => {
  res.json([{ id: 1, test: "wheee" }]);
});

// all job related API's
router.post("/create-job", async (req, res) => {
  try {
    const { _id, ...body } = req.body;
    const create = await JobInfo.insertOne(body);

    if (create._id) {
      res
        .status(200)
        .json({ success: true, message: "Successfully created new job." });
    } else {
      throw new Error(`Communicated with server but failed to create entry`);
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error in create-job: " + err });
  }
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

router.get("/job-info/:id", async (req, res) => {
  const jobId = req.params.id || "";

  try {
    if (!jobId) throw new Error("Not a valid job ID");

    const jobData = await JobInfo.findById(jobId);
    if (!jobData.company) {
      throw new Error("Failed to fetch job but communicated with API");
    }
    res.status(200).json({
      success: true,
      message: "fetched job information successfully.",
      jobData: jobData,
    });
  } catch (err) {
    console.error("error in job fetch by ID: " + err);
    res.status(500).json({
      success: false,
      message: `Failed to fetch job information: `,
      err,
    });
  }
});

router.delete("/delete-job/:id", async (req, res) => {
  const jobId = req.params.id || "";
  try {
    if (!jobId) throw new Error("Not a valid job ID");

    const deleteJob = await JobInfo.deleteOne(
      new mongoose.Types.ObjectId(jobId)
    );
    if (deleteJob.deletedCount === 1) {
      res.status(200).json({ success: true, message: `You deleted ${jobId}!` });
    } else {
      throw new Error("Did not delete job");
    }
  } catch (err) {
    console.error(`error in delete jobs: `, err);
    res.status(500).json({ success: false, message: "oh meow meow" });
  }
});

router.put("/update-job", async (req, res) => {
  try {
    const job = req.body;
    if (!job._id) throw new Error("no valid job to update");

    const updateJob = await JobInfo.updateOne({ _id: job._id }, job);
    if (updateJob.matchedCount === 1) {
      res.status(200).json({ success: true, message: `you did it` });
    } else
      throw new Error(
        `unable to update the job, please contact me if this fails`
      );
  } catch (err) {
    req.status(500).json({ success: false, message: "false" });
  }
});

router.get("/query-jobs/:query", async (req, res) => {
  console.log(`PING`)
  try {
    const query = req.params.query;
    console.log(`backend receives query: `, query)
    const results = await JobInfo.find({
  $or: [
    { company: { $regex: query, $options: 'i' } },
    { job_title: { $regex: query, $options: 'i' } },
    { state: { $regex: query, $options: 'i' } },
    { job_description: { $regex: query, $options: 'i' } },
    { other: { $regex: query, $options: 'i' } }
  ]
  })
  console.log(`results: `, results)
  res.status(200).json({success: true, message: 'got job'})
    
  } catch (err) {
    console.error(`error in querying jobs: `, err);
    res.status(500).json({success: false, message: "failed to get jobs matching the query"})
  }
})

module.exports = router;
