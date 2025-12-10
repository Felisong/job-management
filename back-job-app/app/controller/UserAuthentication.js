const Users = require("../models/Users");
const bcrypt = require("bcrypt")

class UserAuthentication {
  static async createUser(userData) {
    const jwt = require("jsonwebtoken");
    try {
      const saltNum = 10;
      const { email, password } = userData;
      // first I check if there is already an entry with the email
      const exists = await Users.findOne({ email: email });
      console.log(`exists is: `, exists);
      if (exists) throw new Error("Email already Exists.");
      const salt = bcrypt.genSaltSync(saltNum);
      const hash = bcrypt.hashSync(password, salt);
      // const result = await Users.insertOne({
      //   email: email,
      //   password: hash,
      //   role: 'USER',
      //   validated: false,
      //   createdAt: new Date()
      // });
      // GENERATE TOKEN HERE
      return {
        success: true,
        message: "meow",
      };
    } catch (err) {
      console.log(`error in: UserAuthentication.createUser: ${err}`);
      return {
        success: FALSE,
        message: `Error: ${err}`,
      };
    }
  }
}

module.exports = UserAuthentication;
