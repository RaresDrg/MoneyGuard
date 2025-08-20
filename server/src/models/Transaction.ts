import { Schema, model } from "mongoose";
import type { TransactionType } from "../app.types.js";
import { ALL_CATEGORIES } from "../constants/index.js";

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
        values: ALL_CATEGORIES,
        message: `=> it should be one of: ${ALL_CATEGORIES.join(", ")}`,
      },
      required: [true, "=> this field is required"],
    },
    sum: {
      type: Number,
      required: [true, "=> this field is required"],
      validate: {
        validator: (value: number) => value > 0 && value < 100000000,
        message: "Sum must be between 0 and 100,000,000",
      },
    },
    date: {
      type: Date,
      required: [true, "=> this field is required"],
    },
    comment: {
      type: String,
      trim: true,
      minlength: [5, "Comment must be at least 5 characters long"],
      maxlength: [200, "Comment must be at most 200 characters long"],
      required: [true, "=> this field is required"],
    },
  },
  { versionKey: false }
);

const Transaction = model<TransactionType>("transaction", schema);

export default Transaction;
