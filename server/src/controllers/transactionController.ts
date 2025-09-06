import { Request, Response, NextFunction } from "express";
import { transactionService, userService } from "../servicies/index.js";
import * as utils from "../utils/index.js";
import { validateData } from "../config/index.js";
import type { UserType } from "../app.types.js";
import { TRANSACTION_CATEGORIES } from "../constants/index.js";

async function addTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, category, sum, date, comment } = req.body;
    validateData({ type, category, sum, date, comment });

    const user = req.user as UserType;

    const data = { owner: user._id, type, category, sum, date, comment };
    const addedTransaction = await transactionService.addTransactionToDB(data);

    const updatedBalance = utils.calcUpdatedBalance(user.balance, {
      type: "add",
      addedTransaction: { type, sum },
    });
    await userService.updateUser(user._id, { balance: updatedBalance });

    utils.sendSuccessResponse(res, 201, {
      message: "Transaction added successfully",
      data: { addedTransaction, updatedBalance },
    });
  } catch (error) {
    next(error);
  }
}

async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit: rawLimit, cursor: rawCursor, sort: rawSort } = req.query;

    const filteredQuery = Object.fromEntries(
      Object.entries({ rawLimit, rawCursor, rawSort }).filter(
        ([, value]) => value !== undefined
      )
    );
    validateData(filteredQuery);

    const limit = rawLimit ? Number(rawLimit) : null;
    const sort = rawSort === "descending" ? "descending" : "ascending";
    const cursor = rawCursor
      ? { _id: sort === "ascending" ? { $gt: rawCursor } : { $lt: rawCursor } }
      : null;

    const owner = (req.user as UserType)._id;
    const dbQuery = cursor ? { owner, ...cursor } : { owner };

    const transactions = limit
      ? await transactionService.getTransactionsFromDB(dbQuery, sort, limit)
      : await transactionService.getTransactionsFromDB(dbQuery, sort);

    const message = transactions.length
      ? "Transactions retrieved successfully"
      : "Looks like there's nothing here for now";

    utils.sendSuccessResponse(res, 200, { message, data: { transactions } });
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { transactionID: ID } = req.params;
    const targetedDocument = await transactionService.findDocument({ _id: ID });

    if (!targetedDocument) {
      const error = new Error("Transaction not found");
      error.name = "NotFound";
      throw error;
    }

    const { type, category, sum, date, comment } = req.body;
    validateData({ type, category, sum, date, comment });

    const updates = { type, category, sum, date, comment };
    const updatedTransaction = await transactionService.updateTransactionInDB(
      ID,
      updates
    );

    const user = req.user as UserType;

    const updatedBalance = utils.calcUpdatedBalance(user.balance, {
      type: "edit",
      oldTransaction: {
        type: targetedDocument.type,
        sum: targetedDocument.sum,
      },
      updatedTransaction: { type, sum },
    });
    await userService.updateUser(user._id, { balance: updatedBalance });

    utils.sendSuccessResponse(res, 200, {
      message: "Transaction updated successfully",
      data: { updatedTransaction, updatedBalance },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { transactionID: ID } = req.params;
    const result = await transactionService.deleteTransactionFromDB(ID);

    if (!result) {
      const error = new Error("Transaction not found");
      error.name = "NotFound";
      throw error;
    }

    const user = req.user as UserType;

    const updatedBalance = utils.calcUpdatedBalance(user.balance, {
      type: "delete",
      deletedTransaction: { type: result.type, sum: result.sum },
    });
    await userService.updateUser(user._id, { balance: updatedBalance });

    utils.sendSuccessResponse(res, 200, {
      message: "Transaction deleted successfully",
      data: { deletedTransaction: result, updatedBalance },
    });
  } catch (error) {
    next(error);
  }
}

async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    utils.sendSuccessResponse(res, 200, {
      message: "Categories retrieved successfully",
      data: TRANSACTION_CATEGORIES,
    });
  } catch (error) {
    next(error);
  }
}

async function getStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    const { startDate, endDate } = req.query;
    validateData({ startDate, endDate });

    const start = utils.normalizeDate(new Date(startDate as string), false);
    const end = utils.normalizeDate(new Date(endDate as string), true);

    if (start > end) {
      const error = new Error("Start Date must be before End Date");
      error.name = "ValidationError";
      throw error;
    }

    const dbQuery = {
      owner: (req.user as UserType)._id,
      date: { $gte: start, $lt: end },
    };
    const data = await transactionService.getTransactionsFromDB(dbQuery);

    if (data.length === 0) {
      const error = new Error("No statistics available for this period");
      error.name = "NotFound";
      throw error;
    }

    const statistics = utils.calculateStatistics(data);

    utils.sendSuccessResponse(res, 200, {
      message: "Statistics retrieved successfully",
      data: { statistics },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getCategories,
  getStatistics,
};
