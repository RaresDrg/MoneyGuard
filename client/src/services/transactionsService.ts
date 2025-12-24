import { apiClient } from "../utils";
import type { Transaction } from "../App.types";

type TransactionData = Omit<Transaction, "id">;
type TransactionID = Transaction["id"];
type PaginationParams = {
  sort: "ascending" | "descending";
  limit: number;
  cursor?: string;
};

async function addTransaction(transactionData: TransactionData) {
  const res = await apiClient.post("/transactions", transactionData);
  return res.data;
}

async function getTransactions(paginationParams: PaginationParams) {
  const res = await apiClient.get("/transactions", {
    params: paginationParams,
  });
  return res.data;
}

async function updateTransaction(id: TransactionID, updates: TransactionData) {
  const res = await apiClient.put(`/transactions/${id}`, updates);
  return res.data;
}

async function deleteTransaction(id: TransactionID) {
  const res = await apiClient.delete(`/transactions/${id}`);
  return res.data;
}

async function fetchCategories() {
  const res = await apiClient.get("/transactions/categories");
  return res.data;
}

async function fetchStatistics(startDate: string, endDate: string) {
  const res = await apiClient.get("/transactions/statistics", {
    params: { startDate, endDate },
  });
  return res.data;
}

export {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  fetchCategories,
  fetchStatistics,
};
