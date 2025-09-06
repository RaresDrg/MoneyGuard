import { Schema, model } from "mongoose";
import type { UserType } from "../app.types.js";

const schema = new Schema<UserType>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "=> this field is required"],
      minlength: [3, "=> it must be at least 3 characters"],
      maxlength: [50, "=> it must be at most 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "=> this field is required"],
    },
    password: {
      type: String,
      required: [true, "=> this field is required"],
    },
    balance: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      default: null,
    },
    validationToken: {
      type: {
        value: { type: String, required: true },
        expiresAt: { type: Date, required: true },
      },
      default: null,
    },
  },
  { versionKey: false }
);

const User = model<UserType>("user", schema);

export default User;
