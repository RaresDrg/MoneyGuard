import { ErrorRequestHandler } from "express";
import { sendFailureResponse } from "../utils/index.js";

const errorMiddleware: ErrorRequestHandler = (error, req, res, _next) => {
  if (error.code === 11000) {
    const duplicatedFields = Object.keys(error.keyPattern);
    const duplicateEntries = duplicatedFields.map(
      (field) => `${field} — ${error.keyValue[field]}`,
    );
    const msg = `Duplicate entry for fields: ${duplicateEntries.join(", ")}`;
    return sendFailureResponse(res, 409, msg);
  }

  switch (error.name) {
    case "BadGateway": {
      const msg = `We're experiencing issues with an external service. Please try again later`;
      return sendFailureResponse(res, 502, msg);
    }
    case "Internal": {
      const msg = `We're experiencing technical difficulties. Please try again later`;
      return sendFailureResponse(res, 500, msg);
    }
    case "RateLimitError": {
      return sendFailureResponse(res, 429, error.message);
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
      const msg = `Invalid ID format — it must be a 24-character hexadecimal string`;
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
