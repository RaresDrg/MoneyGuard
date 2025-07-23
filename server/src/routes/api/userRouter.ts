import express from "express";
import { userController } from "../../controllers/index.js";
import {
  jwtAuthMiddleware,
  validateTokenMiddleware,
} from "../../middlewares/index.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/logout", jwtAuthMiddleware, userController.logout);

router.post("/forgot-password", userController.forgotPassword);
router.patch(
  "/update-password",
  validateTokenMiddleware,
  userController.updatePassword
);

export default router;
