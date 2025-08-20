import { Transaction } from "../models/index.js";
import type { TransactionType } from "../app.types.js";
import { FilterQuery, SortOrder } from "mongoose";

export function addTransactionToDB(data: Omit<TransactionType, "_id">) {
  return Transaction.create(data);
}

export function getTransactionsFromDB(
  query: FilterQuery<TransactionType>,
  sort: "ascending" | "descending" = "ascending",
  limit?: number
) {
  const sorted: Record<string, SortOrder> =
    sort === "descending" ? { _id: -1 } : { _id: 1 };

  if (limit) {
    return Transaction.find(query).sort(sorted).limit(limit);
  } else {
    return Transaction.find(query).sort(sorted);
  }
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

export function deleteTransactionFromDB(ID: string) {
  return Transaction.findByIdAndDelete(ID);
}

export function findDocument(query: FilterQuery<TransactionType>) {
  return Transaction.findOne(query);
}
