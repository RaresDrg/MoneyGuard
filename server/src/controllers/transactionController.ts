import { RequestHandler } from "express";
import { Types } from "mongoose";
import { transactionService, userService } from "../servicies/index.js";
import * as utils from "../utils/index.js";
import { validateData } from "../config/index.js";
import { TRANSACTION_CATEGORIES } from "../constants/index.js";

const addTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { type, category, sum, date, comment } = req.body;
    validateData({ type, category, sum, date, comment });

    const user = req.user!;

    const data = { owner: user._id, type, category, sum, date, comment };
    const addedTransaction = await transactionService.addTransaction(data);

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
};

const getTransactions: RequestHandler = async (req, res, next) => {
  try {
    const optionalQueryKeys = ["limit", "cursor", "sort"] as const;
    const query = utils.extractOptionalQuery(req.query, optionalQueryKeys);
    if (query) validateData(query);

    const limit = query?.limit ? Number(query.limit) : undefined;
    const cursor = query?.cursor ? new Types.ObjectId(query.cursor) : undefined;
    const sortDirection =
      query?.sort === "descending" ? "descending" : "ascending";
    const sortBy = "_id";

    const dbQuery = {
      owner: req.user!._id,
      ...(cursor && {
        _id: sortDirection === "ascending" ? { $gt: cursor } : { $lt: cursor },
      }),
    };

    const transactions = await transactionService.findTransactions(
      dbQuery,
      sortBy,
      sortDirection,
      limit
    );

    const message = transactions.length
      ? "Transactions retrieved successfully"
      : "Looks like there's nothing here for now";

    utils.sendSuccessResponse(res, 200, { message, data: { transactions } });
  } catch (error) {
    next(error);
  }
};

const updateTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { transactionID: ID } = req.params;
    validateData({ ID });

    const targetedTransaction = await transactionService.findTransaction(ID);
    if (!targetedTransaction) {
      throw utils.createError("NotFound", "Transaction not found");
    }

    const { type, category, sum, date, comment } = req.body;
    validateData({ type, category, sum, date, comment });

    const updates = { type, category, sum, date, comment };
    const updatedTransaction = await transactionService.updateTransaction(
      ID,
      updates
    );

    const user = req.user!;

    const updatedBalance = utils.calcUpdatedBalance(user.balance, {
      type: "edit",
      oldTransaction: {
        type: targetedTransaction.type,
        sum: targetedTransaction.sum,
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
};

const deleteTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { transactionID: ID } = req.params;
    validateData({ ID });

    const result = await transactionService.deleteTransaction(ID);
    if (!result) {
      throw utils.createError("NotFound", "Transaction not found");
    }

    const user = req.user!;

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
};

const getCategories: RequestHandler = async (req, res, next) => {
  try {
    utils.sendSuccessResponse(res, 200, {
      message: "Categories retrieved successfully",
      data: TRANSACTION_CATEGORIES,
    });
  } catch (error) {
    next(error);
  }
};

const getStatistics: RequestHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    validateData({ statisticsRange: { startDate, endDate } });

    const start = utils.normalizeDate(new Date(startDate as string), false);
    const end = utils.normalizeDate(new Date(endDate as string), true);

    const dbQuery = { owner: req.user!._id, date: { $gte: start, $lt: end } };
    const data = await transactionService.findTransactions(dbQuery);

    if (data.length === 0) {
      throw utils.createError(
        "NotFound",
        "No statistics available for this period"
      );
    }

    const statistics = utils.calculateStatistics(data);

    utils.sendSuccessResponse(res, 200, {
      message: "Statistics retrieved successfully",
      data: { statistics },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getCategories,
  getStatistics,
};
