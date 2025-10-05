import { Types } from "mongoose";

export type AtLeastOne<T, K extends keyof T = keyof T> = {
  [P in K]: Pick<T, P> & Partial<Record<Exclude<K, P>, T[Exclude<K, P>]>>;
}[K];

export type UserType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  balance: number;
};

export type AuthSession = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  type: "auth";
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};

export type ValidationSession = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  type: "validation";
  validationToken: string;
  expiresAt: Date;
};

export type TransactionType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  type: "income" | "expense";
  category: string;
  sum: number;
  date: Date;
  comment: string;
};

export type ExchangeRatesType = {
  _id: Types.ObjectId;
  rates: Record<string, number>;
  expiresAt: Date;
};

type TransactionTypeAndSum = Pick<TransactionType, "type" | "sum">;

type AddAction = {
  type: "add";
  addedTransaction: TransactionTypeAndSum;
};

type DeleteAction = {
  type: "delete";
  deletedTransaction: TransactionTypeAndSum;
};

type EditAction = {
  type: "edit";
  oldTransaction: TransactionTypeAndSum;
  updatedTransaction: TransactionTypeAndSum;
};

export type TransactionAction = AddAction | DeleteAction | EditAction;
