const mongoose = require("mongoose");

const jobInformationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    job_title: { type: String, required: true },
    date_sent: { type: Date, required: true },
    state: { type: String, required: true },
    job_description: { type: String, required: false },
    other: { type: String, required: false },
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
  },
  { collection: "job_information" ,
    versionKey: false
  }
);

const JobInfo = mongoose.model("job_information", jobInformationSchema);

module.exports = JobInfo;