export const EMAIL_REGEX = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const MONTHS: readonly string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CURRENT_YEAR = new Date().getFullYear();
export const MIN_YEAR = 2020;

export const YEARS: readonly string[] = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, index) => String(CURRENT_YEAR - index)
);

export const EXPENSE_BACKGROUNDS: readonly string[] = [
  "#FED057",
  "#FFD8D0",
  "#FD9498",
  "#C5BAFF",
  "#6E78E8",
  "#4A56E2",
  "#81E1FF",
  "#24CCA7",
  "#BEDBB0",
  "#ff7700",
];

export const PAGE_SIZE = 10;

// todo
/** Important => choose app status: inProduction = true | false */
const inProduction: boolean = true;

export const API_BASE_URL = inProduction
  ? "https://moneyguardserver.vercel.app"
  : "http://localhost:3000";
