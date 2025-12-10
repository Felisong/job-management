const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true },
    password: { type: String, required: true },
    user_role: { type: String, required: true },
    isValid: {type: Boolean, required: true}
  },
  { collection: "users" }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;