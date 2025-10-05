import { Transaction } from "../models/index.js";
import type { TransactionType } from "../types/app.types.js";
import { FilterQuery, SortOrder } from "mongoose";

export function addTransaction(data: Omit<TransactionType, "_id">) {
  return Transaction.create(data);
}

export function findTransaction(id: string) {
  return Transaction.findById(id);
}

export function findTransactions(
  query: FilterQuery<TransactionType> & { owner: TransactionType["owner"] },
  sortBy: Exclude<keyof TransactionType, "owner" | "comment"> = "_id",
  sortDirection: "ascending" | "descending" = "ascending",
  limit?: number
) {
  const sort: Record<string, SortOrder> = {
    [sortBy]: sortDirection === "ascending" ? 1 : -1,
  };

  return limit
    ? Transaction.find(query).sort(sort).limit(limit)
    : Transaction.find(query).sort(sort);
}

export function updateTransaction(
  id: string,
  updates: Omit<TransactionType, "_id" | "owner">
) {
  return Transaction.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
}

export function deleteTransaction(id: string) {
  return Transaction.findByIdAndDelete(id);
}
