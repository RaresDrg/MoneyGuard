import { Request, Response, NextFunction } from "express";
import { findSession } from "../servicies/sessionService.js";
import { validateData } from "../config/index.js";
import { createError } from "../utils/index.js";

const validationSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { validationToken } = req.body;
    validateData({ validationToken });

    const session = await findSession({ validationToken });
    if (!session?.owner) {
      throw createError(
        "NotFound",
        "No user found for the given validation token"
      );
    }

    req.user = session.owner;
    next();
  } catch (error) {
    next(error);
  }
};

export default validationSessionMiddleware;
