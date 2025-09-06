import { Request, Response, NextFunction } from "express";
import { userService } from "../servicies/index.js";
import * as utils from "../utils/index.js";
import { validateData, sendEmail } from "../config/index.js";
import type { UserType } from "../app.types.js";

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    validateData({ name, email, password });

    const userData = { name, email, password: utils.hash(password) };
    const newUser = await userService.addUsertoDB(userData);

    const tokens = utils.generateAuthTokens(newUser);
    await userService.updateUser(newUser._id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 201, {
      message: "User created successfully",
      data: { user: utils.selectUserProperties(newUser) },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, loginPassword } = req.body;
    validateData({ email, loginPassword });

    const user = await userService.findUser({ email });
    if (!user) {
      const error = new Error("There is no account associated with this email");
      error.name = "NotFound";
      throw error;
    }

    const passwordMatch = utils.compareHashedData(loginPassword, user.password);
    if (!passwordMatch) {
      const error = new Error("Password is wrong");
      error.name = "ValidationError";
      throw error;
    }

    const tokens = utils.generateAuthTokens(user);
    await userService.updateUser(user._id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as UserType;
    await userService.updateUser(user._id, { token: null });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    utils.sendSuccessResponse(res, 200, { message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    validateData({ email });

    const user = await userService.findUser({ email });
    if (!user) {
      const error = new Error("There is no account associated with this email");
      error.name = "NotFound";
      throw error;
    }

    const validationToken = utils.generateValidationToken();
    await userService.updateUser(user.id, { validationToken });

    await sendEmail(user, validationToken.value);

    const message =
      "Password change request received. Please check your email (including spam folder) for a confirmation message.";
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    validateData({ password });

    const user = req.user as UserType;
    const tokens = utils.generateAuthTokens(user);

    await userService.updateUser(user._id, {
      password: utils.hash(password),
      token: tokens.refreshToken,
      validationToken: null,
    });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      message: "Password changed successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  updatePassword,
};
