import { Schema, model } from "mongoose";
import type { TransactionType } from "../types/app.types.js";

const schema = new Schema<TransactionType>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      required: [true, "=> this field is required"],
    },
    sum: {
      type: Number,
      required: [true, "=> this field is required"],
      validate: {
        validator: (value: number) => value > 0 && value < 100_000_000,
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
  {
    versionKey: false,
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        const { _id, type, category, sum, date, comment } = ret;
        return { id: _id.toString(), type, category, sum, date, comment };
      },
    },
  }
);

const Transaction = model<TransactionType>("Transaction", schema);

export default Transaction;
