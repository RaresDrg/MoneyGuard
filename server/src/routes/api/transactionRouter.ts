import express from "express";
import { transactionController } from "../../controllers/index.js";

const router = express.Router();

router.post("/", transactionController.addTransaction);
router.get("/", transactionController.getTransactions);
router.put("/:transactionID", transactionController.updateTransaction);
router.delete("/:transactionID", transactionController.deleteTransaction);

router.get("/categories", transactionController.getCategories);
router.get("/statistics", transactionController.getStatistics);

export default router;
