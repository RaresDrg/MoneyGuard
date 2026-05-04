import { Response } from "express";

export function sendSuccessResponse<T extends object>(
  res: Response,
  statusCode: 200 | 201,
  responseBody: T,
) {
  res.status(statusCode).json({ status: "success", ...responseBody });
}

export function sendFailureResponse(
  res: Response,
  statusCode: 400 | 401 | 403 | 404 | 409 | 429 | 500 | 502,
  message: string,
) {
  res.status(statusCode).json({ status: "failed", message });
}
