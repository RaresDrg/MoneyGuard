import { Schema, model } from "mongoose";
import type { UserType } from "../types/app.types.js";

const schema = new Schema<UserType>(
  {
    authMethod: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (value) {
          if (this.authMethod === "google") return true;
          else return value.trim().length >= 3 && value.trim().length <= 50;
        },
        message: "=> it must be between 3 and 50 characters long",
      },
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authMethod === "local";
      },
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
