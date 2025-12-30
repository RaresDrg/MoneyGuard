import { RequestHandler } from "express";
import { OPEN_EXCHANGE_RATES_API_KEY } from "../config/config-env.js";
import { exchangeRatesService } from "../servicies/index.js";
import * as utils from "../utils/index.js";

const getRates: RequestHandler = async (req, res, next) => {
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
    if (!rates) throw utils.createError("BadGateway");

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
};

export default { getRates };
