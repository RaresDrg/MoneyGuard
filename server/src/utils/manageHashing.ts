import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/config-env.js";

export function hash(text: string) {
  const hashedText = bcrypt.hashSync(text, SALT_ROUNDS);
  return hashedText;
}

export function compareHashedData(plainText: string, hashedText: string) {
  return bcrypt.compareSync(plainText, hashedText);
}
