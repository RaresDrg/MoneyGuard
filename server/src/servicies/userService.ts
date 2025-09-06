import { User } from "../models/index.js";
import type { UserType } from "../app.types.js";
import { FilterQuery } from "mongoose";

type Data = Pick<UserType, "name" | "email" | "password">;
export function addUsertoDB(data: Data) {
  return User.create(data);
}

export function findUser(query: FilterQuery<UserType>) {
  return User.findOne(query);
}

export function updateUser(userId: string, updates: Partial<UserType>) {
  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });
}
