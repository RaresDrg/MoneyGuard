import { User } from "../models/index.js";
import type { UserType, AtLeastOne } from "../types/app.types.js";

type UserData =
  | (Pick<UserType, "name" | "email" | "password"> & { authMethod: "local" })
  | (Pick<UserType, "name" | "email"> & { authMethod: "google" });
type UserUpdatesData =
  | AtLeastOne<UserType, "name" | "email" | "password" | "balance">
  | AtLeastOne<UserType, "name" | "email" | "balance">;

export function addUser(data: UserData) {
  return User.create(data);
}

export function findUser(query: AtLeastOne<UserType, "_id" | "email">) {
  return User.findOne(query);
}

export function updateUser(userId: UserType["_id"], updates: UserUpdatesData) {
  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });
}
