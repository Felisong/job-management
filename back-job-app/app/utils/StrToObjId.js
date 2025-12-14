const Mongoose = require("mongoose");

const StrToObjId = (str) => {
  return new Mongoose.Types.ObjectId(str);
};

module.exports = { StrToObjId };
