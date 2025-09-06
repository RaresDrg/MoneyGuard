import { Request, Response, NextFunction } from "express";
import { validateData } from "../config/index.js";
import { findUser } from "../servicies/userService.js";

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { validationToken } = req.body;
    validateData({ validationToken });

    const user = await findUser({ "validationToken.value": validationToken });

    if (!user) {
      const error = new Error("No user found for the given validation token");
      error.name = "NotFound";
      throw error;
    }

    if (user.validationToken!.expiresAt < new Date()) {
      const error = new Error("Validation token is expired");
      error.name = "Forbidden";
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateTokenMiddleware;
