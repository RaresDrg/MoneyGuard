import { Schema, model } from "mongoose";
import type { UserType } from "../types/app.types.js";

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
  },
  {
    versionKey: false,
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        const { name, email, balance } = ret;
        return { name, email, balance };
      },
    },
  }
);

const User = model<UserType>("User", schema);

export default User;
