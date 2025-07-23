import logger from "morgan";
import { IN_DEVELOPMENT } from "../config/config-env.js";

const loggerMiddleware = logger(IN_DEVELOPMENT ? "dev" : "combined");

export default loggerMiddleware;
