import cors from "cors";
import { CLIENT_URL } from "../config/config-env.js";

const corsMiddleware = cors({
  origin: CLIENT_URL,
  credentials: true,
});

export default corsMiddleware;
