import Joi from "joi";
import { getTransactionCategories } from "../utils/index.js";

const categories = getTransactionCategories();

const VALIDATIONS_MAP = {
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be between 3 and 50 characters long",
    "string.max": "Name must be between 3 and 50 characters long",
    "any.required": "Name field is required",
  }),
  email: Joi.string()
    .trim()
    .pattern(new RegExp(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/))
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email address",
      "any.required": "Email field is required",
    }),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be at least 8 characters long and must include an uppercase, a lowercase and a digit",
      "any.required": "Password field is required",
    }),
  loginPassword: Joi.string().required().messages({
    "string.base": "LoginPassword must be a string",
    "string.empty": "LoginPassword is required",
    "any.required": "LoginPassword field is required",
  }),
  type: Joi.string().valid("income", "expense").required().messages({
    "any.only": "Type is either: income or expense",
    "any.required": "Type field is required",
  }),
  category: Joi.string()
    .when("type", {
      is: "income",
      then: Joi.valid(...categories.income).messages({
        "any.only": `Category is one of: ${categories.income.join(", ")}`,
      }),
    })
    .when("type", {
      is: "expense",
      then: Joi.valid(...categories.expense).messages({
        "any.only": `Category is one of: ${categories.expense.join(", ")}`,
      }),
    })
    .required()
    .messages({
      "any.required": "Category field is required",
    }),
  sum: Joi.number().min(0).required().messages({
    "number.base": "Sum must be a number",
    "number.min": "Sum must be a positive number",
    "any.required": "Sum field is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date field is required",
  }),
  comment: Joi.string().trim().min(10).max(200).required().messages({
    "string.base": "Comment must be a string",
    "string.empty": "Comment is required",
    "string.min": "Comment must be between 10 and 200 characters long",
    "string.max": "Comment must be between 10 and 200 characters long",
    "any.required": "Comment field is required",
  }),
  year: Joi.number()
    .integer()
    .min(2020)
    .max(new Date().getUTCFullYear())
    .required()
    .messages({
      "number.base": "Year must be a number",
      "number.integer": "Year must be an integer",
      "number.min": "Year must not be earlier than 2020",
      "number.max": `Year must not be later than ${new Date().getUTCFullYear()}`,
      "any.required": "Year field is required",
    }),
  month: Joi.number().integer().min(0).max(11).required().messages({
    "number.base": "Month must be a valid number",
    "number.integer": "Month must be an integer",
    "number.min": "Month must be between 0 (January) and 11 (December)",
    "number.max": "Month must be between 0 (January) and 11 (December)",
    "any.required": "Month field is required",
  }),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

export function validateData(data: Partial<Record<ValidationKey, unknown>>) {
  const schema = Joi.object(
    Object.fromEntries(
      Object.keys(data)
        .filter((key) => key in VALIDATIONS_MAP)
        .map((key) => [key, VALIDATIONS_MAP[key as ValidationKey]])
    )
  );

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) throw error;
}

export default validateData;
