import "dotenv/config";
import env from "env-var";

export const IN_DEVELOPMENT =
  env.get("NODE_ENV").default("development").asString() === "development";

export const CLIENT_URL = env.get("CLIENT_URL").required().asString();
export const SERVER_URL = env.get("SERVER_URL").required().asString();

export const PORT = env.get("PORT").default("3000").asPortNumber();
export const DB_URI = env.get("DB_URI").required().asString();

export const GOOGLE_CLIENT_ID = env
  .get("GOOGLE_CLIENT_ID")
  .required()
  .asString();
export const GOOGLE_CLIENT_SECRET = env
  .get("GOOGLE_CLIENT_SECRET")
  .required()
  .asString();

export const SALT_ROUNDS = env.get("SALT_ROUNDS").required().asIntPositive();
export const RANDOM_BYTES_LENGTH = env
  .get("RANDOM_BYTES_LENGTH")
  .required()
  .asIntPositive();
export const COOKIE_PARSER_SECRET = env
  .get("COOKIE_PARSER_SECRET")
  .required()
  .asString();

export const RESEND_API_KEY = env.get("RESEND_API_KEY").required().asString();
export const OPEN_EXCHANGE_RATES_API_KEY = env
  .get("OPEN_EXCHANGE_RATES_API_KEY")
  .required()
  .asString();
