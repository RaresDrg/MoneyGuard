import nodemailer from "nodemailer";
import { EMAIL, PASSWORD, IN_DEVELOPMENT } from "./config-env.js";

async function sendEmail(user: { name: string; email: string }, data: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL, pass: PASSWORD },
    });

    const recoveryLink = IN_DEVELOPMENT
      ? `http://localhost:5173/reset-password?validationToken=${data}`
      : `https://moneyguard-xi.vercel.app//reset-password?validationToken=${data}`;

    const message = {
      from: EMAIL,
      to: user.email,
      subject: "Password Change Request Received",
      text: `Dear ${user.name}, \n\nWe have received your request to change the password for the account associated with this email address. \n\nPlease click the link below to reset your password: \n${recoveryLink} \n\nIf you did not request this password change, please ignore this email. \n\nBest regards, \nMoneyGuard Customer Support Team !`,
      html: `<p>Dear <strong>${user.name}</strong>,</p>
            <p>We have received your request to change the password for the account associated with this email address.</p>
            <p>Please click the following link to reset your password: <a href="${recoveryLink}">Reset Password</a></p>
            <p>If you did not request this password change, please ignore this email.</p>
            <p>Best regards,</p>
            <p><strong>MoneyGuard</strong> Customer Support Team !</p>`,
    };

    await transporter.sendMail(message);
  } catch (error) {
    throw new Error(`Email not sent. ${error}`);
  }
}

export default sendEmail;
