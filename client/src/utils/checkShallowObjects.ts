/**
 * Compares two shallow objects (same-level keys and primitive values).
 *
 * Return value:
 * - true  → if the objects are different (they have a different number of keys OR at least one different value).
 * - false → if the objects are identical shallow (same keys and same values).
 *
 * Notes:
 * - Only primitive values are compared (string, number, boolean, null, undefined).
 * - This is a shallow comparison: nested objects or arrays are not allowed.
 */

type PrimitiveTypes = string | number | boolean | null | undefined;

export function checkShallowObjects<T extends Record<string, PrimitiveTypes>>(
  firstObject: T,
  secondObject: T
) {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  if (firstObjectKeys.length !== secondObjectKeys.length) return true;

  return firstObjectKeys.some((key) => firstObject[key] !== secondObject[key]);
}
