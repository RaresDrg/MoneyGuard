import { ExchangeRates } from "../models/index.js";
import type { ExchangeRatesType } from "../types/app.types.js";

export function addExchangeRatesData(data: Omit<ExchangeRatesType, "_id">) {
  return ExchangeRates.create(data);
}

export function getExchangeRatesData() {
  return ExchangeRates.findOne({ expiresAt: { $gt: new Date() } });
}
