import express, { Response } from "express";
import helmet from "helmet";
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
  rateLimitMiddleware,
} from "./middlewares/index.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(express.json());
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(cookieParserMiddleware);
app.use(disableCacheMiddleware);
app.use(rateLimitMiddleware);

app.get("/", (_, res: Response) => res.redirect("/api-docs"));
app.use("/api-docs", ...swaggerMiddleware);

app.get("/health-check", (_, res: Response) => {
  res.status(200).send("🚀 MoneyGuard API is running.");
});

app.use("/api/users", userRouter);
app.use("/api/transactions", authSessionMiddleware, transactionRouter);
app.use("/api/exchange-rates", authSessionMiddleware, exchangeRatesRouter);

app.use(missingRouteMiddleware);
app.use(errorMiddleware);

export default app;
