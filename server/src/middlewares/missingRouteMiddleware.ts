import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/index.js";

const missingRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = createError(
    "NotFound",
    "API route not found. Check the documentation at: https://moneyguardserver.vercel.app/api-docs"
  );
  next(error);
};

export default missingRouteMiddleware;
