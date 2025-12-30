import { RequestHandler } from "express";
import { userService, sessionService } from "../servicies/index.js";
import * as utils from "../utils/index.js";
import { validateData, sendEmail } from "../config/index.js";

const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    validateData({ name, email, password });

    const newUser = await userService.addUser({
      name,
      email,
      password: utils.hash(password),
      authMethod: "local",
    });

    await utils.handleAuthSession(newUser._id, "init", res);

    utils.sendSuccessResponse(res, 201, {
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, loginPassword } = req.body;
    validateData({ email, loginPassword });

    const user = await userService.findUser({ email });
    if (!user) {
      throw utils.createError(
        "NotFound",
        "There is no account associated with this email address"
      );
    }

    if (user.authMethod === "google") {
      throw utils.createError(
        "Forbidden",
        "The account associated with this email address is managed through Google, so please authenticate using Google sign-in"
      );
    }

    const passwordMatch = utils.compareHashedData(loginPassword, user.password);
    if (!passwordMatch) {
      throw utils.createError("ValidationError", "Password is wrong");
    }

    await utils.handleAuthSession(user._id, "init", res);

    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    await sessionService.deleteSession({ owner: req.user!._id, type: "auth" });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    utils.sendSuccessResponse(res, 200, { message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    validateData({ email });

    const user = await userService.findUser({ email });
    if (!user) {
      throw utils.createError(
        "NotFound",
        "There is no account associated with this email address"
      );
    }

    if (user.authMethod === "google") {
      throw utils.createError(
        "Forbidden",
        "Password reset is not supported. The account associated with this email address is managed through Google sign-in"
      );
    }

    const validationToken = await utils.handleValidationSession(user._id);
    await sendEmail("reset-password", user, validationToken);

    const message = `Request received - check your email (including spam folder) for further instructions`;
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
};

const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    validateData({ password });

    const userId = req.user!._id;

    const updates = { password: utils.hash(password) };
    const updatedUser = await userService.updateUser(userId, updates);

    await utils.handleAuthSession(userId, "init", res);

    utils.sendSuccessResponse(res, 200, {
      message: "Password changed successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const finalizeGoogleAuth: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user!;
    await utils.handleAuthSession(user._id, "init", res);
    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  updatePassword,
  finalizeGoogleAuth,
};
