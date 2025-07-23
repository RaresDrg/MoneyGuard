import { Request, Response, NextFunction } from "express";
import { sendFailureResponse } from "../utils/index.js";

interface CustomError extends Error {
  code?: number;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err?.name === "ValidationError") {
    sendFailureResponse(res, 400, err.message);
    return;
  }

  if (err?.name === "CastError") {
    sendFailureResponse(res, 400, "Invalid id value");
    return;
  }

  if (err?.code === 11000) {
    const message = "You can't use this email. It belongs to another account";
    sendFailureResponse(res, 409, message);
    return;
  }

  console.error(err);
  sendFailureResponse(res, 500, "Internal server error");
};

export default errorMiddleware;
