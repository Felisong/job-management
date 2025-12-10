const Users = require("../models/Users");
const bcrypt = require("bcrypt");

class UserAuthentication {
  static async createUser(userData) {
    const jwt = require("jsonwebtoken");
    try {
      const { email, password } = userData;
      const saltNum = 10;

      // first I check if there is already an entry with the email
      const exists = await Users.findOne({ email: email });
      if (exists) throw new Error("Email already exists.");
      // then I create entry
      const salt = bcrypt.genSaltSync(saltNum);
      const hash = bcrypt.hashSync(password, salt);
      const result = await Users.insertOne({
        email: email,
        password: hash,
        userRole: "USER",
        validated: false,
        createdAt: new Date(),
      });
      // GENERATE TOKEN HERE
      const userId = result._id.toString();
      const userToken = jwt.sign(
        {
          user_id: userId,
          email: email,
          userRole: "USER",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        success: true,
        message: "Successfully created new user",
        userData: {
          user_id: userId,
          user_token: userToken,
          user_role: "USER",
          token_expiration: "7d",
          validated: false,
        },
      };
    } catch (err) {
      console.log(`error in: UserAuthentication.createUser: ${err}`);
      return {
        success: false,
        message: `Error: ${err}`,
      };
    }
  }
}

module.exports = UserAuthentication;
