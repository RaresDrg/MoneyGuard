import cors from "cors";
import { IN_DEVELOPMENT } from "../config/config-env.js";

const corsMiddleware = cors({
  origin: IN_DEVELOPMENT,
  credentials: IN_DEVELOPMENT,
});

export default corsMiddleware;
