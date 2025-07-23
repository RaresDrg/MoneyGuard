import { Request, Response, NextFunction } from "express";

const disableCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
};

export default disableCacheMiddleware;
