const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserAuthentication {
  static async createUser(userData) {
    try {
      const { email, password } = userData;
      const saltNum = 10;
      // first I check if there is already an entry with the email
      const exists = await Users.findOne({ email: email.toLowerCase() });
      if (exists) throw new Error("Email already exists.");
      // then I create entry
      const salt = bcrypt.genSaltSync(saltNum);
      const hash = bcrypt.hashSync(password, salt);
      const result = await Users.create({
        email: email.toLowerCase(),
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
          email: email.toLowerCase(),
          user_role: "USER",
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

  static async signInUser(userData) {
    const { email, password } = userData;
    try {
      const match = await Users.findOne({ email: email.toLowerCase() });
      if (!match) {
        return {
          success: false,
          message: "No email matching entry is in my records",
          statusCode: 400,
        };
      }
      console.log(`match works: `, match)
      const isValid = bcrypt.compareSync(password, match.password);
      if (!isValid) {
        return {
          success: false,
          message: "Password incorrect",
          statusCode: 400,
        };
      }
       // GENERATE TOKEN HERE
      const userId = match._id.toString();
      const userToken = jwt.sign(
        {
          user_id: userId,
          email: email.toLowerCase(),
          user_role: match.userRole,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log(`isValid: `, isValid)

      return {
        success: true,
        message: "Successfully signed in user",
        statusCode: 200,
        userData: {
          user_id: String(match._id),
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
