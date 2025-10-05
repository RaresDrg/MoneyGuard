import { Schema, model } from "mongoose";
import type { AuthSession, ValidationSession } from "../types/app.types.js";

type SessionType = AuthSession | ValidationSession;

const schema = new Schema<SessionType>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["auth", "validation"],
      required: true,
    },
    accessToken: {
      type: String,
      required: function () {
        return this.type === "auth";
      },
    },
    refreshToken: {
      type: String,
      required: function () {
        return this.type === "auth";
      },
    },
    validationToken: {
      type: String,
      required: function () {
        return this.type === "validation";
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
  { versionKey: false, strict: true }
);
schema.index({ owner: 1, type: 1 }, { unique: true });

const Session = model<SessionType>("Session", schema);

export default Session;
