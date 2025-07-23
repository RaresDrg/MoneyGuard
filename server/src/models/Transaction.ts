import { Schema, model } from "mongoose";
import type { TransactionType } from "../app.types.js";
import { getCategoriesArray } from "../utils/index.js";

const schema = new Schema<TransactionType>(
  {
    owner: {
      type: String,
      ref: "users",
      required: [true, "=> this field is required"],
    },
    type: {
      type: String,
      enum: {
        values: ["income", "expense"],
        message: "=> it should be one of these: income or expense",
      },
      required: [true, "=> this field is required"],
    },
    category: {
      type: String,
      enum: {
        values: getCategoriesArray(),
        message: `=> it should be one of: ${getCategoriesArray().join(", ")}`,
      },
      required: [true, "=> this field is required"],
    },
    sum: {
      type: Number,
      min: [0, "a positive value is required for the sum field"],
      required: [true, "=> this field is required"],
    },
    // todo: index compus owner + date
    date: {
      type: Date,
      required: [true, "=> this field is required"],
    },
    comment: {
      type: String,
      trim: true,
      minlength: [10, "Comment must be at least 10 characters long"],
      maxlength: [200, "Comment must be less than 200 characters long"],
      required: [true, "=> this field is required"],
      set: (value: string) =>
        value
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase()
          .replace(/^./, (char) => char.toUpperCase()),
    },
  },
  { versionKey: false }
);

const Transaction = model<TransactionType>("transaction", schema);

export default Transaction;
