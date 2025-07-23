import { Request, Response, NextFunction } from "express";
import { transactionService } from "../servicies/index.js";
import * as utils from "../utils/index.js";
import { validateData } from "../config/index.js";
import type { UserType } from "../app.types.js";

async function addTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, category, sum, date, comment } = req.body;
    validateData({ type, category, sum, date, comment });

    const owner = (req.user as UserType)._id;
    const data = { owner, type, category, sum, date, comment };
    await transactionService.addTransactionToDB(data);

    const query = { owner };
    const currentList = await transactionService.getTransactionsFromDB(query);
    const balance = utils.calculateBalance(currentList);

    utils.sendSuccessResponse(res, 201, {
      message: "The transaction has been successfully added",
      data: { transactionslist: currentList, balance },
    });
  } catch (error) {
    next(error);
  }
}

async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const query = { owner: (req.user as UserType)._id };
    const currentList = await transactionService.getTransactionsFromDB(query);

    if (currentList.length === 0) {
      utils.sendSuccessResponse(res, 200, {
        message: "There are no transactions saved in the database",
        data: { transactionslist: null, balance: 0 },
      });
      return;
    }

    const balance = utils.calculateBalance(currentList);
    utils.sendSuccessResponse(res, 200, {
      message: "Transactions retrieved successfully",
      data: { transactionslist: currentList, balance },
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
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const query = { owner: (req.user as UserType)._id };
    const currentList = await transactionService.getTransactionsFromDB(query);

    if (currentList.length === 0) {
      utils.sendSuccessResponse(res, 200, {
        message: "The transaction has been successfully deleted",
        data: { transactionslist: null, balance: 0 },
      });
      return;
    }

    const balance = utils.calculateBalance(currentList);
    utils.sendSuccessResponse(res, 200, {
      message: "The transaction has been successfully deleted",
      data: { transactionslist: currentList, balance },
    });
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
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { type, category, sum, date, comment } = req.body;
    validateData({ type, category, sum, date, comment });

    const updates = { type, category, sum, date, comment };
    await transactionService.updateTransactionInDB(ID, updates);

    const query = { owner: (req.user as UserType)._id };
    const currentList = await transactionService.getTransactionsFromDB(query);
    const balance = utils.calculateBalance(currentList);

    utils.sendSuccessResponse(res, 200, {
      message: "The transaction has been successfully updated",
      data: { transactionslist: currentList, balance },
    });
  } catch (error) {
    next(error);
  }
}

async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = utils.getTransactionCategories();
    utils.sendSuccessResponse(res, 200, {
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

async function getStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    const { year, month } = req.query;
    validateData({ year, month });

    const query = {
      owner: (req.user as UserType)._id,
      date: {
        $gte: new Date(Date.UTC(Number(year), Number(month), 1)),
        $lt: new Date(Date.UTC(Number(year), Number(month) + 1, 0, 23, 59, 59)),
      },
    };
    const transactions = await transactionService.getTransactionsFromDB(query);

    // todo
    if (transactions.length === 0) {
      utils.sendFailureResponse(res, 404, "Transactions not found");
      return;
    }

    const statistics = utils.calculateStatistics(transactions);
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
  getList,
  deleteTransaction,
  updateTransaction,
  getCategories,
  getStatistics,
};
