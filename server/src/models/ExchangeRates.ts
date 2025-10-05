import { Schema, model } from "mongoose";
import type { ExchangeRatesType } from "../types/app.types.js";

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
      validate: {
        validator: function (value: Date) {
          return value.getTime() > Date.now();
        },
        message: "expiresAt must be in the future",
      },
      index: { expires: 0 },
    },
  },
  {
    versionKey: false,
    strict: true,
    collection: "exchangeRates",
    toJSON: {
      transform(_doc, ret) {
        const { rates, expiresAt } = ret;
        return { rates, expiresAt };
      },
    },
  }
);

const ExchangeRates = model<ExchangeRatesType>("ExchangeRates", schema);

export default ExchangeRates;
