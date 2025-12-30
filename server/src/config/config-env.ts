import "dotenv/config";
import env from "env-var";

export const IN_DEVELOPMENT =
  env.get("NODE_ENV").default("development").asString() === "development";

export const CLIENT_URL = IN_DEVELOPMENT
  ? env.get("CLIENT_URL_DEV").required().asString()
  : env.get("CLIENT_URL_PROD").required().asString();
export const SERVER_URL = IN_DEVELOPMENT
  ? env.get("SERVER_URL_DEV").required().asString()
  : env.get("SERVER_URL_PROD").required().asString();

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

export const EMAIL = env.get("EMAIL").required().asEmailString();
export const PASSWORD = env.get("PASSWORD").required().asString();

export const OPEN_EXCHANGE_RATES_API_KEY = env
  .get("OPEN_EXCHANGE_RATES_API_KEY")
  .required()
  .asString();
