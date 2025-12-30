import { RequestHandler } from "express";
import { Types } from "mongoose";
import { findSession } from "../servicies/sessionService.js";
import { handleAuthSession, createError } from "../utils/index.js";

const authSessionMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.signedCookies ?? {};
    const [scheme, sessionId] = req.headers.authorization?.split(" ") ?? [];

    if (scheme === "Bearer" && Types.ObjectId.isValid(sessionId)) {
      const _id = new Types.ObjectId(sessionId);

      if (accessToken) {
        const session = await findSession({ _id, accessToken });
        if (session?.owner) {
          req.user = session.owner;
          next();
          return;
        }
      }

      if (refreshToken) {
        const session = await findSession({ _id, refreshToken });
        if (session?.owner) {
          if (req.path !== "/logout") {
            await handleAuthSession(session.owner._id, "renew", res);
          }
          req.user = session.owner;
          next();
          return;
        }
      }
    }

    throw new Error();
  } catch {
    const error = createError(
      "Unauthorized",
      "Access denied: invalid or expired session"
    );
    next(error);
  }
};

export default authSessionMiddleware;
