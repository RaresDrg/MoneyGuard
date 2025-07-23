import { Transaction } from "../models/index.js";
import type { TransactionType } from "../app.types.js";
import { FilterQuery } from "mongoose";

export function addTransactionToDB(data: Omit<TransactionType, "_id">) {
  return Transaction.create(data);
}

export function deleteTransactionFromDB(ID: string) {
  return Transaction.findByIdAndDelete(ID);
}

export function updateTransactionInDB(
  ID: string,
  updates: Omit<TransactionType, "_id" | "owner">
) {
  return Transaction.findByIdAndUpdate(ID, updates, {
    new: true,
    runValidators: true,
  });
}

export function findDocument(query: FilterQuery<TransactionType>) {
  return Transaction.findOne(query);
}

export function getTransactionsFromDB(query: FilterQuery<TransactionType>) {
  return Transaction.find(query);
}
