const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    password: { type: String, required: true },
    other: { type: String, required: false },
  },
  { collection: "users" }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;