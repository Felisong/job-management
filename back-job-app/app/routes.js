import express from "express";
import mongoose from "mongoose";
import JobInfo from "./models/JobInformationModel.js";
import Users from "./models/Users.js";

// controller and middleware
import UserAuthentication from "./controller/UserAuthentication.js";
import { authenticateToken } from "./middleware/auth.js";
import { SendEmail, StrToObjId } from "./utils/utils.js";
const router = express.Router();

router.get("/users", (req, res) => {
  res.json([{ id: 1, test: "wheee" }]);
});

// all job related API's
router.post("/create-job", async (req, res) => {
  try {
    const {
      company,
      job_title,
      date_sent,
      state,
      job_description,
      other,
      user_id,
    } = req.body;
    const userIdObj = StrToObjId(user_id);
    if (!mongoose.Types.ObjectId.isValid(userIdObj)) {
      return (
        res.status(400).json *
        {
          success: false,
          message: "Invalid user ID",
        }
      );
    }
    const create = await JobInfo.insertOne({
      company,
      job_title,
      date_sent,
      state,
      job_description,
      other,
      user_id: userIdObj,
    });
    console.log(`create res: `, create);
    if (create._id) {
      res
        .status(200)
        .json({ success: true, message: "Successfully created new job." });
    } else {
      throw new Error(`Communicated with server but failed to create entry`);
    }
  } catch (err) {
    console.error(`Error in create jobs: `, err);
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
    const userId = req.query.userId ? req.query.userId : null;

    let query = lastJobId
      ? {
          _id: { $lt: StrToObjId(lastJobId) },
          user_id: StrToObjId(userId),
        }
      : { user_id: StrToObjId(userId) };

    const [jobs, total] = await Promise.all([
      JobInfo.find(query)
        .select("-job_description -other")
        .sort({ _id: -1 })
        .limit(limit),
      JobInfo.countDocuments({ user_id: StrToObjId(userId) }),
    ]);

    const hasMore = jobs.length === limit;
    const nextJobId = hasMore ? jobs[jobs.length - 1]._id : null;

    res.status(200).json({
      success: true,
      jobs: jobs,
      message: "Successfully fetched job information",
      nextExpectedId: nextJobId,
      total: total,
    });
  } catch (err) {
    console.error(`error in jobs fetch :`, err);
    res.status(500).json({ success: false, message: "Oh meow..." });
  }
});

router.get("/job-info/:id/:userId", async (req, res) => {
  const jobId = req.params.id || "";
  const userId = req.params.userId;

  try {
    if (!jobId) throw new Error("Not a valid job ID");

    const jobData = await JobInfo.findById(jobId);
    if (!jobData.company) {
      throw new Error("Failed to fetch job but communicated with API");
    }
    if (String(jobData.user_id) !== userId) {
      throw new Error("User ID does not match this job.");
    }

    res.status(200).json({
      success: true,
      message: "fetched job information successfully.",
      jobData: jobData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Error: ` + err,
    });
  }
});

router.delete("/delete-job/:id", async (req, res) => {
  const jobId = req.params.id || "";
  try {
    if (!jobId) throw new Error("Not a valid job ID");

    const deleteJob = await JobInfo.deleteOne(StrToObjId(jobId));
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

router.get("/query-jobs/:query/:userId", async (req, res) => {
  try {
    const incomingQueries = req.params.query;
    const userId = req.params.userId || "";
    const queries = incomingQueries.split(" ").filter((q) => q.trim() !== "");
    const allConditions = [];
    // building the conditions for each query
    for (const query of queries) {
      const queryDate = new Date(query);

      const queryConditions = [
        { company: { $regex: query, $options: "i" } },
        { job_title: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { job_description: { $regex: query, $options: "i" } },
        { other: { $regex: query, $options: "i" } },
      ];
      // checks if the date is a valid date, if so, adds greater than and less then entries to get the whole day
      if (!isNaN(queryDate)) {
        const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

        queryConditions.push({
          date_sent: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        });
      }
      allConditions.push({ $or: queryConditions });
    }

    const results = await JobInfo.aggregate([
      { $match: { user_id: StrToObjId(userId) } },
      { $match: { $or: allConditions } },
      {
        $addFields: {
          matchCount: {
            $add: queries.map((query) => {
              const queryDate = new Date(query);
              const dateMatch = !isNaN(queryDate)
                ? {
                    $cond: [
                      {
                        $and: [
                          {
                            $gte: [
                              "$date_sent",
                              new Date(queryDate.setHours(0, 0, 0, 0)),
                            ],
                          },
                          {
                            $lte: [
                              "$date_sent",
                              new Date(queryDate.setHours(23, 59, 59, 999)),
                            ],
                          },
                        ],
                      },
                      1,
                      0,
                    ],
                  }
                : 0;

              return {
                $add: [
                  {
                    $cond: [
                      {
                        $regexMatch: {
                          input: { $ifNull: ["$company", ""] },
                          regex: query,
                          options: "i",
                        },
                      },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $regexMatch: {
                          input: { $ifNull: ["$job_title", ""] },
                          regex: query,
                          options: "i",
                        },
                      },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $regexMatch: {
                          input: { $ifNull: ["$state", ""] },
                          regex: query,
                          options: "i",
                        },
                      },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $regexMatch: {
                          input: { $ifNull: ["$job_description", ""] },
                          regex: query,
                          options: "i",
                        },
                      },
                      1,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $regexMatch: {
                          input: { $ifNull: ["$other", ""] },
                          regex: query,
                          options: "i",
                        },
                      },
                      1,
                      0,
                    ],
                  },
                  dateMatch,
                ],
              };
            }),
          },
        },
      },
      { $sort: { matchCount: -1 } },
      { $limit: 100 },
    ]);

    if (results.length === 0) {
      res.status(200).json({
        success: true,
        message: "no jobs found matching the query",
        jobs: [],
      });
    } else {
      res
        .status(200)
        .json({ success: true, message: "jobs found", jobs: results });
    }
  } catch (err) {
    console.error(`error in querying jobs: `, err);
    res.status(500).json({
      success: false,
      message: "failed to get jobs matching the query",
    });
  }
});

// ======== USER AUTHENTICATION AND SIGN IN =================

router.post("/create-user", async (req, res) => {
  const userData = req.body;

  try {
    const result = await UserAuthentication.createUser(userData);

    if (result.success) {
      res.status(200).json(result);
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    console.error(`Error in User Creation: `, err);
    if (String(err).includes("exists")) {
      res.status(409).json({ success: false, message: err });
    } else {
      res.status(500).json({ success: false, message: "Error Creating User" });
    }
  }
});
// checks if user is signed in or not
router.get("/user/me", authenticateToken, async (req, res) => {
  try {
    const userData = req.user;
    const userId = StrToObjId(userData.userId);
    const userRes = await Users.findOne({
      _id: StrToObjId(userData.user_id),
    });

    // if token is expired return a failure. Marked as true for handling in front
    const tokenExpiryDate = new Date(userData.exp * 1000);
    const isExpired = new Date() > tokenExpiryDate;
    if (isExpired)
      return res.status(401).json({ success: true, message: "Token Expired" });

    const user = {
      user_id: userData.user_id,
      user_role: userRes.userRole,
      validated: userRes.validated,
      user_email: userRes.email,
    };

    res.status(200).json({
      success: true,
      message: "Successfully got user",
      userData: user,
    });
  } catch (err) {
    console.error("Error in User Authentication: ", err);
    res.status(500).json({ success: false, message: "Error fetching user." });
  }
});

router.put("/user/sign-in", async (req, res) => {
  try {
    const result = await UserAuthentication.signInUser(req.body);

    if (result.success) {
      res.status(200).json(result);
    } else if (result.statusCode) {
      res.status(400).json(result);
    }
  } catch (err) {
    console.error("Error in user sign in: " + err);
    res.status(500).json({
      success: false,
      message: "Error: " + err,
    });
  }
});

router.post("/validation-email", async (req, res) => {
  try {
    const { userId, email } = req.body;
    const result = await SendEmail(email, userId, "validation");
    if (result.success) {
      res
        .status(200)
        .json({ success: true, message: `User validation email sent.` });
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    console.error("Error in user validation email: ", err);
    res.status(500).json({
      success: false,
      message: "Error: " + err,
    });
  }
});

router.put("/users/validate/:paramId", authenticateToken, async (req, res) => {
  const paramId = req.params.paramId;
  const tokenId = req.user.user_id;
  try {
    if (paramId !== tokenId)
      throw new Error(`You cannot verify other people's accounts`);
    const validate = await Users.updateOne(
      {
        _id: tokenId,
      },
      {
        $set: { validated: true },
      }
    );
    if (validate.matchedCount === 0) throw new Error("User not found.");
    res.status(200).json({ success: true, message: `User is validated.` });
  } catch (err) {
    console.error("Error in user validation: ", err);
    res.status(500).json({
      success: false,
      message: "Error: " + err,
    });
  }
});

router.post("users/email-change-pw", authenticateToken, async (res, req) => {
  try {
    //  make sure i receive data, if not return error
    const { userId, email } = req.body;
    if (!userId || !email) throw new Error("Missing required user information");
    // send email
    const result = await SendEmail(email, userId, "password");
    if (!result.success)throw new Error(result.message);
    // make page where user changes email or password. That page has to be sure.
      res
        .status(200)
        .json({ success: true, message: `Email to change password has been sent.` });
  } catch (err) {
    console.error("Error in user change pw: ", err);
    res.status(500).json({
      success: false,
      message: "Error: " + err,
    });
  }
});

export default router;
