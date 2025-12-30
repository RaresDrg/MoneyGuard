import express from "express";
import { userController } from "../../controllers/index.js";
import {
  authSessionMiddleware,
  validationSessionMiddleware,
  googleAuthMiddleware,
} from "../../middlewares/index.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/logout", authSessionMiddleware, userController.logout);

router.post("/forgot-password", userController.forgotPassword);
router.patch(
  "/update-password",
  validationSessionMiddleware,
  userController.updatePassword
);

router.get("/google-auth", googleAuthMiddleware.redirect);
router.get("/google-auth/callback", googleAuthMiddleware.handleCallback);
router.post(
  "/google-auth/finalize",
  validationSessionMiddleware,
  userController.finalizeGoogleAuth
);

export default router;
