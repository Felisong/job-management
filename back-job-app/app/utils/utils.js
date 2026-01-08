import "dotenv/config";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { mongoose } from "mongoose";
const frontUrl = process.env.FRONT_SITE_LINK;
const resend = new Resend(process.env.RESEND_API_KEY);

const SendEmail = async (email, userId, type) => {
  const verifyLink = `${frontUrl}/validate/${userId}`;
  const changeDataLink = ``;
  let htmlContent = "";
  let subject = "";
  if (type === "validation") {
    subject = "Account Validation - Job Tracker Web App";
    htmlContent = `
        <style>
        .container {  max-width: 600px; }
        .button { 
          background-color: #007bff; 
          color: white; 
          padding: 12px 24px; 
          }
        .tiny {
          font-size: 0.7rem;
          color: #241122ff;
        }
        </style>
        <div class="container">
        <h1> Account Validation - Job Application Tracker</h1>
        <p> You have clicked for this email to be validated please click the button below to verify.</p>
        <a href="${verifyLink}" class="button">Verify Email</a>
        <p> Thank you for testing my web app :) </p>
        <br />
        <p>Sincerely,</p>
        <p> Carolina </p>
        <p class="tiny">If you find any trouble using my site please contact me at carolinahs100@gmail.com</p>
        <p class="tiny">If you did not request for this email, 
        <span>
        <a href="${frontUrl}/contact-me"> Let me know.</a>
        </span> 
        </p>
        </div>`;
  } else {
    const capitalizedType =
      type.substring(0, 1).toUpperCase() + type.substring(1);
    subject = `Change your ${capitalizedType}`;
    changeDataLink = `${frontUrl}/change/${type}`
    htmlContent = `
        <style>
        .container {  max-width: 600px; }
        .button { 
          background-color: #007bff; 
          color: white; 
          padding: 12px 24px; 
          }
        .tiny {
          font-size: 0.7rem;
          color: #241122ff;
        }
        </style>
        <div class="container">
        <h1> Change Your ${capitalizedType}</h1>
        <p> You have clicked for this email to be sent, click below to change your ${type}.</p>
        <a href="${changeDataLink}" class="button">Change Password</a>
        <p> Thank you for testing my web app :) </p>
        <br />
        <p> Sincerely, </p>
        <p> Carolina </p>
        <p class="tiny"> If you find any trouble using my site please contact me at carolinahs100@gmail.com</p>
        <p class="tiny"> If you did not request for this email, ignore this email. or contact me. 
        </p>
        </div>`;
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      html: htmlContent,
    });
    return { success: true, message: "Email should have sent" };
  } catch (err) {
    console.error(`failed sending email: ${String(err)}`);
    return { success: false, message: String(err) };
  }
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
};

export { SendEmail, GenerateAuthToken, StrToObjId };
