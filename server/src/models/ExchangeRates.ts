import { Schema, model } from "mongoose";
import type { ExchangeRatesType } from "../app.types.js";

const schema = new Schema<ExchangeRatesType>(
  {
    rates: {
      type: Object,
      required: true,
      validate: {
        validator: function (rates: Record<string, number>) {
          return Object.values(rates).every(
            (value) => typeof value === "number" && value > 0
          );
        },
        message: "All exchange rates must be positive numbers",
      },
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { versionKey: false, collection: "exchangeRates" }
);

const ExchangeRates = model<ExchangeRatesType>("exchangeRates", schema);

export default ExchangeRates;
