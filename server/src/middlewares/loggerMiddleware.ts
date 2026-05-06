import { Request } from "express";
import morgan from "morgan";
import { getClientIp } from "../utils/index.js";
import { IN_DEVELOPMENT } from "../config/config-env.js";

morgan.token("client-ip", (req: Request) => getClientIp(req));

const EXCLUDED_FROM_LOGS = [
  { method: "GET", path: "/health-check", agent: "Render" },
  { method: "HEAD", path: "/health-check", agent: "UptimeRobot" },
];

const LOGGER_FORMAT = IN_DEVELOPMENT
  ? "dev"
  : ':client-ip - - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

const LOGGER_OPTIONS = {
  skip: (req: Request) => {
    const isExcluded = EXCLUDED_FROM_LOGS.some(
      (rule) =>
        req.method === rule.method &&
        req.path === rule.path &&
        req.headers["user-agent"]?.includes(rule.agent),
    );
    return isExcluded;
  },
};

const loggerMiddleware = morgan(LOGGER_FORMAT, LOGGER_OPTIONS);

export default loggerMiddleware;
