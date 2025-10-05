import { Request, Response, NextFunction } from "express";
import { userService, sessionService } from "../servicies/index.js";
import * as utils from "../utils/index.js";
import { validateData } from "../config/index.js";

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    validateData({ name, email, password });

    const userData = { name, email, password: utils.hash(password) };
    const newUser = await userService.addUser(userData);

    await utils.handleAuthSession(newUser._id, "init", res);

    utils.sendSuccessResponse(res, 201, {
      message: "User created successfully",
      data: newUser,
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

    await utils.handleAuthSession(user._id, "init", res);

    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await sessionService.deleteSession({ owner: req.user!._id, type: "auth" });

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

    await utils.handleValidationSession(user);

    const message = `Request received - check your email (including spam folder) for further instructions`;
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    validateData({ password });

    const userId = req.user!._id;

    const updates = { password: utils.hash(password) };
    const updatedUser = await userService.updateUser(userId, updates);

    await sessionService.deleteSession({ owner: userId, type: "validation" });
    await utils.handleAuthSession(userId, "init", res);

    utils.sendSuccessResponse(res, 200, {
      message: "Password changed successfully",
      data: updatedUser,
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
