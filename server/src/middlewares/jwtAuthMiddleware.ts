import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy } from "passport-jwt";
import { findUser, updateUser } from "../servicies/userService.js";
import * as utils from "../utils/index.js";
import { ACCESS_TOKEN_SECRET } from "../config/config-env.js";
import type { UserType } from "../app.types.js";

const opts = {
  jwtFromRequest: (req: Request) => req?.signedCookies?.accessToken ?? null,
  secretOrKey: ACCESS_TOKEN_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await findUser({ _id: payload.id });

      if (!user) {
        throw new Error("User not found");
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err: Error | null, user: UserType | null) => {
      if (!err && user) {
        req.user = user;
        next();
        return;
      }

      if (err || !user) {
        try {
          const refreshToken = req?.signedCookies?.refreshToken ?? null;
          if (!refreshToken) {
            throw new Error("Refresh token missing. Please re-login !");
          }

          const userByRefreshToken = await findUser({ token: refreshToken });
          if (!userByRefreshToken) {
            throw new Error("Invalid refresh token. Please re-login !");
          }

          const renewedTokens = utils.generateAuthTokens(userByRefreshToken);
          await updateUser(userByRefreshToken._id, {
            token: renewedTokens.refreshToken,
          });

          utils.sendTokensAsCookies(res, renewedTokens);
          req.user = userByRefreshToken;
          next();
          return;
        } catch (error) {
          console.error(error);
          utils.sendFailureResponse(res, 401, "Unauthorized access");
        }
      }
    }
  )(req, res, next);
}

export default jwtAuthMiddleware;
