import "dotenv/config";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { mongoose } from "mongoose";
const frontUrl = process.env.FRONT_SITE_LINK;
const resend = new Resend(process.env.RESEND_API_KEY);


const SendEmail = (email, userId) => {
  console.log(`Email being sent...`, userId, email)
  const verifyLink = `${frontUrl}/validate/${userId}`;
  // === EMAIL ====
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Account Validation - :3 meow",
    html: `
        <style>
        .container {  max-width: 600px; }
        .button { 
          background-color: #007bff; 
          color: white; 
          padding: 12px 24px; 
          }
        </style>
        <div class="container">
        <a href="${verifyLink}" class="button">Verify Email</a>
        </div>`,
  });
};

const GenerateAuthToken = (userId, email, role) => {
  const userToken = jwt.sign(
    {
      user_id: userId,
      email: email,
      user_role: role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return userToken;
};

const StrToObjId = (value) => {
  return new mongoose.Types.ObjectId(value);
}

export { SendEmail , GenerateAuthToken, StrToObjId};
