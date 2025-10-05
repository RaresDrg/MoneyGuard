import type { UserType } from "./app.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
