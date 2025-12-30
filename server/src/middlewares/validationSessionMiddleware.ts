import { RequestHandler } from "express";
import { findSessionAndDelete } from "../servicies/sessionService.js";
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
