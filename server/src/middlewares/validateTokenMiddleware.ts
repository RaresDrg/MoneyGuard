import { Request, Response, NextFunction } from "express";
import { sendFailureResponse } from "../utils/index.js";
import { findUser } from "../servicies/userService.js";

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { validationToken } = req.query;
    if (!validationToken || validationToken === "undefined") {
      sendFailureResponse(res, 400, "Validation token missing.");
      return;
    }

    const user = await findUser({ "validationToken.value": validationToken });

    if (!user) {
      sendFailureResponse(res, 404, "Not found");
      return;
    }

    if (user.validationToken!.expiresAt < new Date()) {
      sendFailureResponse(res, 403, "Validation token is expired");
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    sendFailureResponse(res, 500, "Internal server error");
  }
};

export default validateTokenMiddleware;
