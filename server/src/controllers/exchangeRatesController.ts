import { Request, Response, NextFunction } from "express";
import { OPEN_EXCHANGE_RATES_API_KEY } from "../config/config-env.js";
import { exchangeRatesService } from "../servicies/index.js";
import * as utils from "../utils/index.js";

async function getRates(req: Request, res: Response, next: NextFunction) {
  try {
    const dataFromDb = await exchangeRatesService.getExchangeRatesData();
    if (dataFromDb) {
      utils.sendSuccessResponse(res, 200, {
        message: "Exchange rates data retrieved successfully",
        data: dataFromDb,
      });
      return;
    }

    const { rates } = await utils.externalFetch(
      `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`
    );
    if (!rates) {
      const error = new Error();
      error.name = "BadGateway";
      throw error;
    }

    const savedRatesData = await exchangeRatesService.addExchangeRatesData({
      rates,
      expiresAt: utils.normalizeDate(new Date(), true),
    });

    utils.sendSuccessResponse(res, 200, {
      message: "Exchange rates data retrieved successfully",
      data: savedRatesData,
    });
  } catch (error) {
    next(error);
  }
}

export default { getRates };
