import { ExchangeRates } from "../models/index.js";
import type { ExchangeRatesType } from "../app.types.js";

export function addExchangeRatesDataToDB(data: ExchangeRatesType) {
  return ExchangeRates.create(data);
}

export function getExchangeRatesDataFromDB() {
  return ExchangeRates.findOne({ expiresAt: { $gt: new Date() } });
}
