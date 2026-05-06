import { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import { getClientIp, createError } from "../utils/index.js";

function createLimiter(options: Parameters<typeof rateLimit>[0]) {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => getClientIp(req),
    handler: (req, res, next) => {
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

const EXCLUDED_FROM_LIMITING = [
  { method: "GET", path: "/" },
  { method: "GET", path: "/api-docs", prefix: true },
  { method: "GET", path: "/health-check" },
  { method: "HEAD", path: "/health-check" },
];

const rateLimitMiddleware: RequestHandler = (req, res, next) => {
  const isExcluded = EXCLUDED_FROM_LIMITING.some((rule) => {
    return rule.prefix
      ? req.method === rule.method && req.path.startsWith(rule.path)
      : req.method === rule.method && req.path === rule.path;
  });
  if (isExcluded) return next();

  switch (`${req.method} ${req.path}`) {
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
