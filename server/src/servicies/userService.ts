import { User } from "../models/index.js";
import type { UserType, AtLeastOne } from "../types/app.types.js";

export function addUser(data: Omit<UserType, "_id" | "balance">) {
  return User.create(data);
}

export function findUser(query: AtLeastOne<UserType, "_id" | "email">) {
  return User.findOne(query);
}

export function updateUser(
  userId: UserType["_id"],
  updates: AtLeastOne<UserType, "name" | "email" | "password" | "balance">
) {
  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });
}
