import { Request } from "express";
import { IN_DEVELOPMENT } from "../config/config-env.js";

export function getClientIp(req: Request) {
  const ip = IN_DEVELOPMENT
    ? req.ip
    : (req.headers["x-forwarded-for"] as string)?.split(", ")[0];
  return ip ?? "unknown";
}
