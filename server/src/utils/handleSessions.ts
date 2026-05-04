import { Response } from "express";
import type { UserType } from "../types/app.types.js";
import { sessionService } from "../services/index.js";
import { generateRandomBytes } from "./index.js";

export async function handleAuthSession(
  userId: UserType["_id"],
  action: "init" | "renew",
  res: Response,
) {
  const sessionData = {
    owner: userId,
    type: "auth" as const,
    accessToken: generateRandomBytes(),
    refreshToken: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  const session =
    action === "init"
      ? await sessionService.addSession(sessionData)
      : await sessionService.updateSession(
          { owner: userId, type: "auth" },
          sessionData,
        );

  if (session) {
    if (action === "init") {
      res.setHeader("session-id", session._id.toString());
      res.setHeader("Access-Control-Expose-Headers", "session-id");
    }

    res.cookie("accessToken", sessionData.accessToken, {
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    });
    res.cookie("refreshToken", sessionData.refreshToken, {
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: sessionData.expiresAt.getTime() - Date.now(),
      sameSite: "none",
    });
  }
}

export async function handleValidationSession(userId: UserType["_id"]) {
  const sessionData = {
    owner: userId,
    type: "validation" as const,
    validationToken: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };
  await sessionService.addSession(sessionData);
  return sessionData.validationToken;
}
