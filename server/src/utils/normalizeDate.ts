export function normalizeDate(date: Date, endOfDay: boolean) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const [hours, minutes, seconds, ms] = endOfDay
    ? [23, 59, 59, 999]
    : [0, 0, 0, 0];

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
}
