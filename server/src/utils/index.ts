import { Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { envVariables } from "../config/index.js";
import { TRANSACTION_CATEGORIES } from "../constants/index.js";
import type {
  UserType,
  TransactionType,
  TransactionAction,
} from "../app.types.js";

export function sendSuccessResponse(
  res: Response,
  statusCode: 200 | 201,
  responseBody: object
) {
  res.status(statusCode).json({ status: "success", ...responseBody });
}

export function sendFailureResponse(
  res: Response,
  statusCode: 400 | 401 | 403 | 404 | 409 | 500,
  message: string
) {
  res.status(statusCode).json({ status: "failed", message });
}

export function hash(text: string) {
  const salt = bcrypt.genSaltSync(envVariables.SALT_ROUNDS);
  const hashedText = bcrypt.hashSync(text, salt);

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

export function generateValidationToken() {
  const validationToken = {
    value: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };

  return validationToken;
}

export function generateAuthTokens(user: UserType) {
  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    envVariables.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
  const refreshToken = generateRandomBytes();

  const tokens = { accessToken, refreshToken };
  return tokens;
}

export function sendTokensAsCookies(
  res: Response,
  tokens: ReturnType<typeof generateAuthTokens>
) {
  const { accessToken, refreshToken } = tokens;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
}

export function selectUserProperties(user: UserType) {
  return {
    email: user.email,
    name: user.name,
    balance: user.balance,
  };
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
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    const error = `HTTP ${response.status} - ${response.statusText}: ${errorText}`;
    throw new Error(error);
  }

  return response.json();
}
