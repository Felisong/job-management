const mongoose = require("mongoose");

const jobInformationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: false },
    company: { type: String, required: true },
    job_title: { type: String, required: true },
    date_sent: { type: Date, required: true },
    state: { type: String, required: true },
    job_description: { type: String, required: false },
    other: { type: String, required: false },
  },
  { collection: "job_information" }
);

const JobInfo = mongoose.model("job_information", jobInformationSchema);

module.exports = JobInfo;
