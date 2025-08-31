import express from "express";
import { exchangeRatesController } from "../../controllers/index.js";

const router = express.Router();

router.get("/", exchangeRatesController.getRates);

export default router;
