import { RequestHandler } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { findUser, addUser } from "../servicies/userService.js";
import { handleValidationSession } from "../utils/index.js";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_URL,
  CLIENT_URL,
} from "../config/config-env.js";

const options = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${SERVER_URL}/api/users/google-auth/callback`,
};

passport.use(
  new Strategy(options, async (_, __, profile, done) => {
    try {
      const { emails, displayName } = profile;

      const email = emails?.[0].value;
      if (!email) throw new Error("Google profile has no email associated");

      const user =
        (await findUser({ email })) ??
        (await addUser({ name: displayName, email, authMethod: "google" }));

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const googleAuthMiddleware: {
  redirect: RequestHandler;
  handleCallback: RequestHandler;
} = {
  redirect(req, res, next) {
    passport.authenticate("google", {
      session: false,
      prompt: "select_account",
      scope: ["profile", "email"],
    })(req, res, next);
  },
  handleCallback(req, res, next) {
    passport.authenticate("google", { session: false }, async (error, user) => {
      try {
        if (error || !user) throw new Error(error ?? "Missing user");
        const validationToken = await handleValidationSession(user._id);
        res.redirect(`${CLIENT_URL}?googleAuthSuccess=${validationToken}`);
      } catch (error) {
        console.error("❌ [Google auth failed]");
        console.error(error);
        res.redirect(`${CLIENT_URL}?googleAuthFailed=invalid-authentication`);
      }
    })(req, res, next);
  },
};

export default googleAuthMiddleware;
