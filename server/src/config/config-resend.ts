import { Resend } from "resend";
import { RESEND_API_KEY, CLIENT_URL } from "./config-env.js";
import type { UserType } from "../types/app.types.js";
import { createError } from "../utils/index.js";

type EmailType = "reset-password";

const resend = new Resend(RESEND_API_KEY);

const TEMPLATES = {
  "reset-password": (user: UserType, data?: unknown) => {
    return {
      id: "reset-password-moneyguard",
      variables: {
        name: user.name,
        resetLink: `${CLIENT_URL}/reset-password?validationToken=${data}`,
        clientUrl: CLIENT_URL,
      },
    };
  },
};

async function sendEmail(type: EmailType, user: UserType, data?: unknown) {
  const template = TEMPLATES[type](user, data);
  const { error } = await resend.emails.send({ to: user.email, template });

  if (error) {
    console.error("❌ [Email not sent]");
    console.error(error);
    throw createError("Internal");
  }
}

export default sendEmail;
