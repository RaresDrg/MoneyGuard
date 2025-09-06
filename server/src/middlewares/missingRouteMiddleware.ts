import { Request, Response, NextFunction } from "express";

const missingRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error("API route not found");
  error.name = "NotFound";
  next(error);
};

export default missingRouteMiddleware;
