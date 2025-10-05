import { Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { envVariables, sendEmail } from "../config/index.js";
import { TRANSACTION_CATEGORIES } from "../constants/index.js";
import { sessionService } from "../servicies/index.js";
import type {
  UserType,
  TransactionType,
  TransactionAction,
  AtLeastOne,
} from "../types/app.types.js";

export function sendSuccessResponse(
  res: Response,
  statusCode: 200 | 201,
  responseBody: object
) {
  res.status(statusCode).json({ status: "success", ...responseBody });
}

export function sendFailureResponse(
  res: Response,
  statusCode: 400 | 401 | 403 | 404 | 409 | 500 | 502,
  message: string
) {
  res.status(statusCode).json({ status: "failed", message });
}

export function formatDuplicateMessage(field: string, value: string): string {
  switch (field) {
    case "email":
      return `You can't use this email. It belongs to another account`;
    default:
      return `Duplicate entry for the field '${field}': the value '${value}' is already in use`;
  }
}

export function hash(text: string) {
  const hashedText = bcrypt.hashSync(text, envVariables.SALT_ROUNDS);
  return hashedText;
}

export function compareHashedData(plainText: string, hashedText: string) {
  return bcrypt.compareSync(plainText, hashedText);
}

export function generateRandomBytes() {
  const token = crypto
    .randomBytes(envVariables.RANDOM_BYTES_LENGTH)
    .toString("hex");

  return token;
}

export async function handleAuthSession(
  userId: UserType["_id"],
  action: "init" | "renew",
  res: Response
) {
  const sessionData = {
    owner: userId,
    type: "auth" as const,
    accessToken: generateRandomBytes(),
    refreshToken: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  const session =
    action === "init"
      ? await sessionService.addSession(sessionData)
      : await sessionService.updateSession(
          { owner: userId, type: "auth" },
          sessionData
        );

  if (session) {
    if (action === "init") {
      res.setHeader("session-id", session._id.toString());
      res.setHeader("Access-Control-Expose-Headers", "session-id");
    }

    res.cookie("accessToken", sessionData.accessToken, {
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    });
    res.cookie("refreshToken", sessionData.refreshToken, {
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: sessionData.expiresAt.getTime() - Date.now(),
      sameSite: "none",
    });
  }
}

export async function handleValidationSession(user: UserType) {
  const sessionData = {
    owner: user._id,
    type: "validation" as const,
    validationToken: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };
  await sessionService.addSession(sessionData);
  await sendEmail(user, sessionData.validationToken);
}

export function calcUpdatedBalance(
  currentBalance: number,
  action: TransactionAction
) {
  switch (action.type) {
    case "add": {
      const { type, sum } = action.addedTransaction;
      return type === "income" ? currentBalance + sum : currentBalance - sum;
    }
    case "delete": {
      const { type, sum } = action.deletedTransaction;
      return type === "income" ? currentBalance - sum : currentBalance + sum;
    }
    case "edit": {
      const { type: oldType, sum: oldSum } = action.oldTransaction;
      const { type: newType, sum: newSum } = action.updatedTransaction;
      const before = oldType === "income" ? oldSum : -oldSum;
      const after = newType === "income" ? newSum : -newSum;
      return currentBalance - before + after;
    }
    default:
      return currentBalance;
  }
}

export function normalizeDate(date: Date, endOfDay: boolean) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const [hours, minutes, seconds, ms] = endOfDay
    ? [23, 59, 59, 999]
    : [0, 0, 0, 0];

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
}

export function calculateStatistics(transactionsList: Array<TransactionType>) {
  const { income, expense } = TRANSACTION_CATEGORIES;

  const statistics = {
    income: {
      total: 0,
      summary: Object.fromEntries(income.map((category) => [category, 0])),
    },
    expense: {
      total: 0,
      summary: Object.fromEntries(expense.map((category) => [category, 0])),
    },
    balance: 0,
  };

  transactionsList.forEach(({ type, category, sum }) => {
    if (type === "income") {
      statistics.income.total += sum;
      statistics.income.summary[category] += sum;
      statistics.balance += sum;
    }
    if (type === "expense") {
      statistics.expense.total += sum;
      statistics.expense.summary[category] += sum;
      statistics.balance -= sum;
    }
  });

  return statistics;
}

export async function externalFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      const error = `HTTP ${response.status} - ${response.statusText}: ${errorText}`;
      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    console.error("❌ [External fetch failed]");
    console.error(error);

    const errorForClient = new Error();
    errorForClient.name = "BadGateway";
    throw errorForClient;
  }
}

export function extractOptionalQuery<
  T extends Record<string, unknown>,
  K extends keyof T
>(query: T, optionalQueryKeys: readonly K[]) {
  const filteredQuery = Object.fromEntries(
    optionalQueryKeys
      .filter((key) => query[key] !== undefined)
      .map((filteredKey) => [filteredKey, query[filteredKey]])
  );

  return Object.keys(filteredQuery).length > 0
    ? (filteredQuery as AtLeastOne<Record<K, string>>)
    : null;
}
