const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    password: { type: String, required: true },
    resume_path: { type: String, required: true },
    cover_path: { type: String, required: false },
    other: { type: String, required: false },
  },
  { collection: "job_information" }
);

const Users = mongoose.model("users", UserSchema);

module.exports = Users;