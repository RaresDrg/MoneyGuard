import express from "express";
import { currencyController } from "../../controllers/index.js";

const router = express.Router();

router.get("/", currencyController.getRates);

export default router;
