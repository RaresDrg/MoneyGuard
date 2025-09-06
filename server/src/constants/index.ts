export const TRANSACTION_CATEGORIES = {
  income: ["Income"],
  expense: [
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Entertainment",
    "Other expenses",
  ],
};

export const ALL_CATEGORIES = [
  ...TRANSACTION_CATEGORIES.income,
  ...TRANSACTION_CATEGORIES.expense,
];

export const CURRENT_YEAR = new Date().getUTCFullYear();
export const MIN_YEAR = 2020;
