import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import { SendEmail, GenerateAuthToken } from "./../utils/utils.js";

class UserAuthentication {
  static async createUser(userData) {
    try {
      const { email, password } = userData;
      const lowerCaseEmail = email.toLowerCase();
      const saltNum = 10;
      // first I check if there is already an entry with the email
      const exists = await Users.findOne({ email: lowerCaseEmail });
      if (exists) throw new Error("Email already exists.");
      // then I create entry
      const salt = bcrypt.genSaltSync(saltNum);
      const hash = bcrypt.hashSync(password, salt);

      const result = await Users.create({
        email: lowerCaseEmail,
        password: hash,
        userRole: "USER",
        validated: false,
        createdAt: new Date(),
      });
      // GENERATE TOKEN HERE
      const userId = result._id.toString();
      const userToken = GenerateAuthToken(userId, lowerCaseEmail, "USER");

      // Send Validation Email
      SendEmail(lowerCaseEmail, userId);

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
      // check if the user even exists
      const match = await Users.find({ email: email.toLowerCase() });
      if (!match || match.length === 0) {
        return {
          success: false,
          message: "No email matching entry is in my records",
          statusCode: 400,
        };
      }
      // checks the credentials
      const isValid = bcrypt.compareSync(password, match[0].password);
      if (!isValid) {
        return {
          success: false,
          message: "Password incorrect",
          statusCode: 400,
        };
      }
      // GENERATE TOKEN HERE
      const userId = match[0]._id.toString();
      const userToken = GenerateAuthToken(
        userId,
        email.toLowerCase(),
        match[0].userRole
      );

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
      console.log(`error in: UserAuthentication.signIn: ${err}`);
      return {
        success: false,
        message: `Error: ${err}`,
      };
    }
  }
}

export default UserAuthentication;
