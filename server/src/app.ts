import express from "express";
import {
  userRouter,
  transactionRouter,
  currencyRouter,
} from "./routes/api/index.js";
import {
  corsMiddleware,
  loggerMiddleware,
  cookieParserMiddleware,
  disableCacheMiddleware,
  jwtAuthMiddleware,
  missingRouteMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParserMiddleware);
app.use(disableCacheMiddleware);

app.use("/api/users", userRouter);
app.use("/api/transactions", jwtAuthMiddleware, transactionRouter);
app.use("/api/currency", jwtAuthMiddleware, currencyRouter);

app.use(missingRouteMiddleware);
app.use(errorMiddleware);

export default app;
