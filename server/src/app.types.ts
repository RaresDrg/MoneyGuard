export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  token: string | null;
  validationToken: { value: string; expiresAt: Date } | null;
};

export type TransactionType = {
  _id: string;
  owner: string;
  type: "income" | "expense";
  category: string;
  sum: number;
  date: Date;
  comment: string;
};
