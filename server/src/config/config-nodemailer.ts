import nodemailer from "nodemailer";
import { EMAIL, PASSWORD, CLIENT_URL } from "./config-env.js";
import type { UserType } from "../types/app.types.js";
import { createError } from "../utils/index.js";

type EmailType = "reset-password";

function buildEmailMessage(type: EmailType, user: UserType, data?: unknown) {
  switch (type) {
    case "reset-password": {
      const resetLink = `${CLIENT_URL}/reset-password?validationToken=${data}`;
      return {
        from: `"MoneyGuard" <${EMAIL}>`,
        to: user.email,
        subject: "Password Reset Instructions",
        text: `Dear ${user.name}, \n\nWe have received your request to change the password for the account associated with this email address. \n\nPlease click the link below to reset your password: \n${resetLink} \n\nIf you did not request this password change, please ignore this email. \n\nBest regards, \nMoneyGuard Customer Support Team !`,
        html: `
          <div style="font-family: Poppins, Arial, sans-serif; color: #FBFBFB; padding: 20px; border: 1px solid #FFD8D0; border-left: 4px solid #FFD8D0; border-radius: 30px; background-color: rgba(82, 59, 126, 0.8); background-image: url('https://res.cloudinary.com/db73szjbz/image/upload/f_auto,q_auto/emailBg.webp'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            <div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
              🛡️ Your secure password reset link is ready.
            </div>
            <div style="text-align: center; margin-bottom: 40px">
      		    <a href="${CLIENT_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
      			    <img
                  src="https://res.cloudinary.com/db73szjbz/image/upload/f_auto,q_auto/logo.png"
      				    alt="MoneyGuard Logo"
      				    style="width: 160px; max-width: 100%; height: auto; display: inline-block;"
      			    />
      		    </a>
      	    </div>
            <h2 style="margin: 0 0 20px 0; padding: 0; font-size: 20px; line-height: 30px; font-weight: 700;">🔐 Password Reset Notification</h2>
            <p style="margin: 0 0 5px 0; padding: 0; font-size: 16px; line-height: 24px; font-weight: 400">Hello <b style="color: #FFD8D0">${user.name}</b>,</p>
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 16px; line-height: 24px; font-weight: 400;">Looks like you asked to reset your password — just click the button below.</p>
            <a href="${resetLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-align: center; padding: 7px 14px; border-radius: 20px; font-weight: 400; font-size: 16px; line-height: 24px; letter-spacing: 1px; background-color: #FCFCFC; text-decoration: none; color: #623F8B; border: 1px solid black;">
              Change Password
            </a>
            <p style="margin: 10px 0 0 0; padding: 0; font-size: 16px; line-height: 24px; font-weight: 400;" >If you didn't request this, you can safely ignore this email.</p>
            <p style="margin: 35px 0 0 0; padding: 10px 0 0 0; border-top: 1px solid rgba(255, 216, 208, 0.8); font-size: 16px; line-height: 24px; font-weight: 400; font-style: italic; color: rgba(255, 255, 255, 0.8)">Best regards,</p>
            <p style="margin: 0; padding: 0; font-size: 16px; line-height: 24px; font-weight: 400; font-style: italic; color: rgba(255, 255, 255, 0.8)"><b style="color: rgba(255, 255, 255)">MoneyGuard</b> Customer Support Team !</p>
          </div>
        `,
      };
    }
    default: {
      throw new Error("Unknown email type");
    }
  }
}

async function sendEmail(type: EmailType, user: UserType, data?: unknown) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: PASSWORD },
    });
    const message = buildEmailMessage(type, user, data);
    await transporter.sendMail(message);
  } catch (error) {
    console.error("❌ [Email not sent]");
    console.error(error);
    throw createError("Internal");
  }
}

export default sendEmail;
