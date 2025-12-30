import { RequestHandler } from "express";
import { createError } from "../utils/index.js";
import { SERVER_URL } from "../config/config-env.js";

const missingRouteMiddleware: RequestHandler = (req, res, next) => {
  const error = createError(
    "NotFound",
    `API route not found. Check the documentation at: ${SERVER_URL}/api-docs`
  );
  next(error);
};

export default missingRouteMiddleware;
