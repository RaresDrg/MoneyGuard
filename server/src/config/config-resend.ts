import { Resend } from "resend";
import { RESEND_API_KEY, CLIENT_URL } from "./config-env.js";
import type { UserType, EmailType } from "../types/app.types.js";
import { createError } from "../utils/index.js";

const resend = new Resend(RESEND_API_KEY);

const TEMPLATES = {
  "reset-password": (username: string, data?: unknown) => {
    return {
      id: "moneyguard_reset-password",
      variables: {
        name: username,
        resetLink: `${CLIENT_URL}/reset-password?validationToken=${data}`,
        clientUrl: CLIENT_URL,
      },
    };
  },
};

async function sendEmail(type: EmailType, user: UserType, data?: unknown) {
  const username =
    user.name.length > 25 ? `${user.name.slice(0, 25)}...` : user.name;
  const template = TEMPLATES[type](username, data);

  const { error } = await resend.emails.send({ to: user.email, template });
  if (error) {
    console.error("❌ [Email not sent]");
    console.error(error);
    throw createError("Internal");
  }
}

export default sendEmail;
