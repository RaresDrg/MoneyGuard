import "dotenv/config";

export const IN_DEVELOPMENT = process.env.NODE_ENV === "development";
export const PORT = process.env.PORT ?? 3000;
export const DB_URI = process.env.DB_URI!;

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS!);
export const RANDOM_BYTES_LENGTH = Number(process.env.RANDOM_BYTES_LENGTH!);
export const COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET!;

export const EMAIL = process.env.EMAIL!;
export const PASSWORD = process.env.PASSWORD!;

export const OPEN_EXCHANGE_RATES_API_KEY =
  process.env.OPEN_EXCHANGE_RATES_API_KEY!;
