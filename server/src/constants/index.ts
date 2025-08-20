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

export const EMAIL_REGEX = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
