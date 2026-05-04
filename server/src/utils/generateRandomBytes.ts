import crypto from "crypto";
import { RANDOM_BYTES_LENGTH } from "../config/config-env.js";

export function generateRandomBytes() {
  return crypto.randomBytes(RANDOM_BYTES_LENGTH).toString("hex");
}
