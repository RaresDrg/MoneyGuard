import { RequestHandler } from "express";
import { findSessionAndDelete } from "../services/sessionService.js";
import { validateData } from "../config/index.js";
import { createError } from "../utils/index.js";

const validationSessionMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { validationToken } = req.body;
    validateData({ validationToken });

    const session = await findSessionAndDelete({ validationToken });
    if (!session?.owner) {
      throw createError(
        "NotFound",
        "The provided validation token is invalid or has expired",
      );
    }

    req.user = session.owner;
    next();
  } catch (error) {
    next(error);
  }
};

export default validationSessionMiddleware;
