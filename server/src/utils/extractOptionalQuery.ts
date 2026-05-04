import type { AtLeastOne } from "../types/app.types.js";

export function extractOptionalQuery<
  T extends Record<string, unknown>,
  K extends keyof T,
>(query: T, optionalQueryKeys: readonly K[]) {
  const filteredQuery = Object.fromEntries(
    optionalQueryKeys
      .filter((key) => query[key] !== undefined)
      .map((filteredKey) => [filteredKey, query[filteredKey]]),
  );

  return Object.keys(filteredQuery).length > 0
    ? (filteredQuery as AtLeastOne<Record<K, string>>)
    : null;
}
