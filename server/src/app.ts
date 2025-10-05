import express from "express";
import {
  userRouter,
  transactionRouter,
  exchangeRatesRouter,
} from "./routes/api/index.js";
import {
  corsMiddleware,
  loggerMiddleware,
  cookieParserMiddleware,
  disableCacheMiddleware,
  authSessionMiddleware,
  missingRouteMiddleware,
  errorMiddleware,
  swaggerMiddleware,
} from "./middlewares/index.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParserMiddleware);
app.use(disableCacheMiddleware);

app.use("/api-docs", ...swaggerMiddleware);

app.use("/api/users", userRouter);
app.use("/api/transactions", authSessionMiddleware, transactionRouter);
app.use("/api/exchangeRates", authSessionMiddleware, exchangeRatesRouter);

app.use(missingRouteMiddleware);
app.use(errorMiddleware);

export default app;
