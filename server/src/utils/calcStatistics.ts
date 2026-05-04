import type { TransactionType } from "../types/app.types.js";
import { TRANSACTION_CATEGORIES } from "../constants/index.js";

export function calcStatistics(transactionsList: Array<TransactionType>) {
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
      return;
    }
    if (type === "expense") {
      statistics.expense.total += sum;
      statistics.expense.summary[category] += sum;
      statistics.balance -= sum;
    }
  });

  return statistics;
}
