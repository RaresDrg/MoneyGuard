import type { UserType } from "./app.types.js";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserType {}

    interface Request {
      rateLimit?: {
        limit: number;
        current: number;
        remaining: number;
        resetTime: number;
      };
    }
  }
}
