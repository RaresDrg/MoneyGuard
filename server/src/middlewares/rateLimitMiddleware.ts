import { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import { createError } from "../utils/index.js";

function createLimiter(options: Parameters<typeof rateLimit>[0]) {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res, next) {
      const remainingTime = req.rateLimit!.resetTime - Date.now();
      const remainingMinutes = Math.ceil(remainingTime / 1000 / 60);
      const error = createError(
        "RateLimitError",
        `Too many requests — try again in ${remainingMinutes} ${remainingMinutes === 1 ? "minute" : "minutes"}`,
      );
      return next(error);
    },
    ...options,
  });
}

const LIMITERS = {
  generalLimiter: createLimiter({ windowMs: 1 * 60 * 1000, max: 100 }),
  registerLimiter: createLimiter({ windowMs: 10 * 60 * 1000, max: 5 }),
  loginLimiter: createLimiter({ windowMs: 15 * 60 * 1000, max: 10 }),
  forgotPasswordLimiter: createLimiter({ windowMs: 60 * 60 * 1000, max: 4 }),
};

const rateLimitMiddleware: RequestHandler = (req, res, next) => {
  const { method, path } = req;

  if (method === "GET" && path.startsWith("/api-docs")) return next();

  switch (`${method} ${path}`) {
    case "GET /":
    case "GET /health-check":
    case "HEAD /health-check":
      return next();
    case "POST /api/users/register":
      return LIMITERS.registerLimiter(req, res, next);
    case "POST /api/users/login":
      return LIMITERS.loginLimiter(req, res, next);
    case "POST /api/users/forgot-password":
      return LIMITERS.forgotPasswordLimiter(req, res, next);
    default:
      return LIMITERS.generalLimiter(req, res, next);
  }
};

export default rateLimitMiddleware;
