import type { TransactionAction } from "../types/app.types.js";

export function calcUpdatedBalance(
  currentBalance: number,
  action: TransactionAction,
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
