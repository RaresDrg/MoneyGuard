import { Request, Response, NextFunction } from "express";
import { MongoServerError } from "mongodb";
import { sendFailureResponse, formatDuplicateMessage } from "../utils/index.js";

const errorMiddleware = (
  error: Error & MongoServerError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyPattern)[0];
    const duplicatedValue = error.keyValue[duplicatedField];
    const msg = formatDuplicateMessage(duplicatedField, duplicatedValue);
    return sendFailureResponse(res, 409, msg);
  }

  switch (error.name) {
    case "BadGateway": {
      const msg = `We're experiencing issues with an external service. Please try again later`;
      return sendFailureResponse(res, 502, msg);
    }
    case "NotFound":
      return sendFailureResponse(res, 404, error.message);
    case "Forbidden":
      return sendFailureResponse(res, 403, error.message);
    case "Unauthorized":
      return sendFailureResponse(res, 401, error.message);
    case "ValidationError":
      return sendFailureResponse(res, 400, error.message);
    case "CastError": {
      const msg = `Invalid ID format - it must be a 24-character hexadecimal string`;
      return sendFailureResponse(res, 400, msg);
    }
    default: {
      console.error("❌ [Unhandled error]");
      console.error(error);
      return sendFailureResponse(res, 500, "Internal server error");
    }
  }
};

export default errorMiddleware;
