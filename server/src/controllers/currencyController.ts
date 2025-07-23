import { Request, Response, NextFunction } from "express";
import * as utils from "../utils/index.js";
import { OPEN_EXCHANGE_RATES_API_KEY } from "../config/config-env.js";

async function getRates(req: Request, res: Response, next: NextFunction) {
  try {
    const exchangeRatesData = await utils.externalFetch(
      `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`
    );

    utils.sendSuccessResponse(res, 200, {
      message: "Currency data retrieved successfully",
      data: {
        rates: exchangeRatesData.rates,
        timestamp: exchangeRatesData.timestamp * 1000,
      },
    });
  } catch (error) {
    next(error);
  }
}

export default { getRates };
