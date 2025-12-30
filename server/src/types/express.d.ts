import type { UserType } from "./app.types.js";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserType {}
  }
}
