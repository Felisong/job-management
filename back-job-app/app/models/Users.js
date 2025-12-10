const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true },
    validated: {type: Boolean, required: true},
    createdAt: {type: Date, required: true}
  },
  { collection: "users",
    versionKey: false
   }
);

const Users = mongoose.model("users", UserSchema);

module.exports = Users;