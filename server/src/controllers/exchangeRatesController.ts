import { Request, Response, NextFunction } from "express";
import { OPEN_EXCHANGE_RATES_API_KEY } from "../config/config-env.js";
import { exchangeRatesService } from "../servicies/index.js";
import * as utils from "../utils/index.js";

async function getRates(req: Request, res: Response, next: NextFunction) {
  try {
    const dataFromDb = await exchangeRatesService.getExchangeRatesDataFromDB();
    if (dataFromDb) {
      const { rates, expiresAt } = dataFromDb;
      utils.sendSuccessResponse(res, 200, {
        message: "Exchange rates data retrieved successfully",
        data: { rates, expiresAt },
      });
      return;
    }

    const dataFromOpenExchangeApi = await utils.externalFetch(
      `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`
    );

    const rates = dataFromOpenExchangeApi.rates;
    const expiresAt = utils.normalizeDate(new Date(), true);

    await exchangeRatesService.addExchangeRatesDataToDB({ rates, expiresAt });

    utils.sendSuccessResponse(res, 200, {
      message: "Exchange rates data retrieved successfully",
      data: { rates, expiresAt },
    });
  } catch (error) {
    next(error);
  }
}

export default { getRates };
