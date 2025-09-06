import Joi from "joi";
import {
  TRANSACTION_CATEGORIES,
  CURRENT_YEAR,
  MIN_YEAR,
} from "../constants/index.js";

const { income, expense } = TRANSACTION_CATEGORIES;

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
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
      "any.required": "Email field is required",
    }),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be between 8 and 50 characters long",
      "string.max": "Password must be between 8 and 50 characters long",
      "string.pattern.base":
        "Password must include an uppercase, a lowercase and a digit",
      "any.required": "Password field is required",
    }),
  loginPassword: Joi.string().trim().required().messages({
    "string.base": "LoginPassword must be a string",
    "string.empty": "LoginPassword is required",
    "any.required": "LoginPassword field is required",
  }),
  validationToken: Joi.string().trim().required().messages({
    "string.base": "ValidationToken must be a string",
    "string.empty": "ValidationToken is required",
    "any.required": "ValidationToken field is required",
  }),
  type: Joi.string().valid("income", "expense").required().messages({
    "any.only": "Type is either: income or expense",
    "any.required": "Type field is required",
  }),
  category: Joi.string()
    .when("type", {
      is: "income",
      then: Joi.valid(...income).messages({
        "any.only": `Category is one of: ${income.join(", ")}`,
      }),
    })
    .when("type", {
      is: "expense",
      then: Joi.valid(...expense).messages({
        "any.only": `Category is one of: ${expense.join(", ")}`,
      }),
    })
    .required()
    .messages({
      "any.required": "Category field is required",
    }),
  sum: Joi.number().greater(0).less(100_000_000).required().messages({
    "number.base": "Sum must be a number",
    "number.greater": "Sum must be greater than 0",
    "number.less": "Sum must be less than 100,000,000",
    "any.required": "Sum field is required",
  }),
  date: Joi.date()
    .iso()
    .min(`${MIN_YEAR}-01-01`)
    .max(`${CURRENT_YEAR}-12-31`)
    .required()
    .messages({
      "date.base": "Date must be a valid ISO date",
      "date.min": `Date cannot be before 01.01.${MIN_YEAR}`,
      "date.max": `Date cannot be after 31.12.${CURRENT_YEAR}`,
      "any.required": "Date field is required",
    }),
  comment: Joi.string().trim().min(5).max(200).required().messages({
    "string.base": "Comment must be a string",
    "string.empty": "Comment is required",
    "string.min": "Comment must be at least 5 characters long",
    "string.max": "Comment must be at most 200 characters long",
    "any.required": "Comment field is required",
  }),
  startDate: Joi.date()
    .iso()
    .min(`${MIN_YEAR}-01-01`)
    .max(`${CURRENT_YEAR}-12-31`)
    .required()
    .messages({
      "date.base": "Start Date must be a valid ISO date",
      "date.min": `Start Date must be after 01.01.${MIN_YEAR}`,
      "date.max": `Start Date must be before 31.12.${CURRENT_YEAR}`,
      "any.required": "Start Date field is required",
    }),
  endDate: Joi.date()
    .iso()
    .min(`${MIN_YEAR}-01-01`)
    .max(`${CURRENT_YEAR}-12-31`)
    .required()
    .messages({
      "date.base": "End Date must be a valid ISO date",
      "date.min": `End Date must be after 01.01.${MIN_YEAR}`,
      "date.max": `End Date must be before 31.12.${CURRENT_YEAR}`,
      "any.required": "End Date field is required",
    }),
  rawLimit: Joi.number().integer().min(1).max(30).required().messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit must not exceed 30",
    "any.required": "Limit field is required",
  }),
  rawCursor: Joi.string().trim().required().messages({
    "string.base": "Cursor must be a string",
    "string.empty": "Cursor is required",
    "any.required": "Cursor field is required",
  }),
  rawSort: Joi.string().valid("ascending", "descending").required().messages({
    "any.only": "Sort is either: ascending or descending",
    "any.required": "Sort field is required",
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
