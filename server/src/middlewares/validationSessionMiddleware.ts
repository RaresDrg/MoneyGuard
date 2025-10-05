import { Request, Response, NextFunction } from "express";
import { findSession } from "../servicies/sessionService.js";
import { validateData } from "../config/index.js";

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
      const error = new Error("No user found for the given validation token");
      error.name = "NotFound";
      throw error;
    }

    req.user = session.owner;
    next();
  } catch (error) {
    next(error);
  }
};

export default validationSessionMiddleware;
