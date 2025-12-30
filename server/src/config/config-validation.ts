import Joi from "joi";
import { Types } from "mongoose";
import type { AtLeastOne } from "../types/app.types.js";
import {
  TRANSACTION_CATEGORIES,
  CURRENT_YEAR,
  MIN_YEAR,
} from "../constants/index.js";

const { income, expense } = TRANSACTION_CATEGORIES;

const VALIDATIONS_MAP = {
  name: Joi.string().trim().min(3).max(50).required().label("Name").messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must be at most {#limit} characters long",
    "any.required": "{#label} is required",
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "string.email": "{#label} has an invalid format",
      "any.required": "{#label} is required",
    }),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .label("Password")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters long",
      "string.max": "{#label} must be at most {#limit} characters long",
      "string.pattern.base":
        "{#label} must include an uppercase, a lowercase and a digit",
      "any.required": "{#label} is required",
    }),
  loginPassword: Joi.string().required().label("Login Password").messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} is required",
    "any.required": "{#label} is required",
  }),
  type: Joi.string()
    .trim()
    .valid("income", "expense")
    .required()
    .label("Type")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "any.only": "{#label} is either: income or expense",
      "any.required": "{#label} is required",
    }),
  category: Joi.string()
    .when("type", {
      is: "income",
      then: Joi.string()
        .valid(...income)
        .messages({ "any.only": `{#label} is one of: ${income.join(", ")}` }),
    })
    .when("type", {
      is: "expense",
      then: Joi.string()
        .valid(...expense)
        .messages({ "any.only": `{#label} is one of: ${expense.join(", ")}` }),
    })
    .required()
    .label("Category")
    .messages({ "any.required": "{#label} is required" }),
  sum: Joi.number()
    .greater(0)
    .less(100_000_000)
    .required()
    .label("Sum")
    .messages({
      "number.base": "{#label} must be a number",
      "number.greater": "{#label} must be greater than {#limit}",
      "number.less": "{#label} must be less than {#limit}",
      "any.required": "{#label} is required",
    }),
  date: Joi.date()
    .iso()
    .min(`${MIN_YEAR}-01-01`)
    .max(`${CURRENT_YEAR}-12-31`)
    .required()
    .label("Date")
    .messages({
      "date.base": "{#label} must be a valid ISO date",
      "date.min": `{#label} must be after 01.01.${MIN_YEAR}`,
      "date.max": `{#label} must be before 31.12.${CURRENT_YEAR}`,
      "any.required": "{#label} is required",
    }),
  comment: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required()
    .label("Comment")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters long",
      "string.max": "{#label} must be at most {#limit} characters long",
      "any.required": "{#label} is required",
    }),
  statisticsRange: Joi.object({
    startDate: Joi.date()
      .iso()
      .min(`${MIN_YEAR}-01-01`)
      .max(`${CURRENT_YEAR}-12-31`)
      .required()
      .label("Start Date")
      .messages({
        "date.base": "{#label} must be a valid ISO date",
        "date.min": `{#label} must be after 01.01.${MIN_YEAR}`,
        "date.max": `{#label} must be before 31.12.${CURRENT_YEAR}`,
        "any.required": "{#label} is required",
      }),
    endDate: Joi.date()
      .iso()
      .min(`${MIN_YEAR}-01-01`)
      .max(`${CURRENT_YEAR}-12-31`)
      .required()
      .label("End Date")
      .messages({
        "date.base": "{#label} must be a valid ISO date",
        "date.min": `{#label} must be after 01.01.${MIN_YEAR}`,
        "date.max": `{#label} must be before 31.12.${CURRENT_YEAR}`,
        "any.required": "{#label} is required",
      }),
  })
    .custom((value, helpers) => {
      if (value.startDate > value.endDate) return helpers.error("any.invalid");
      return value;
    })
    .messages({
      "any.invalid": "Start Date must be before or equal to End Date",
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(30)
    .required()
    .label("Limit")
    .messages({
      "number.base": "{#label} must be a number",
      "number.integer": "{#label} must be an integer",
      "number.min": "{#label} must be at least {#limit}",
      "number.max": "{#label} must be at most {#limit}",
      "any.required": "{#label} is required",
    }),
  cursor: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
      return value;
    })
    .required()
    .label("Cursor")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "any.invalid":
        "{#label} has an invalid format - it must be a 24-character hexadecimal string",
      "any.required": "{#label} is required",
    }),
  sort: Joi.string()
    .valid("ascending", "descending")
    .required()
    .label("Sort")
    .messages({
      "any.only": "{#label} must be either: ascending or descending",
      "any.required": "{#label} is required",
    }),
  ID: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
      return value;
    })
    .required()
    .label("ID")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "any.invalid":
        "{#label} has an invalid format - it must be a 24-character hexadecimal string",
      "any.required": "{#label} is required",
    }),
  validationToken: Joi.string()
    .trim()
    .required()
    .label("Validation Token")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} is required",
      "any.required": "{#label} is required",
    }),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

function validateData(data: AtLeastOne<Record<ValidationKey, unknown>>) {
  const schema = Joi.object(
    Object.fromEntries(
      Object.keys(data)
        .filter((key) => key in VALIDATIONS_MAP)
        .map((key) => [key, VALIDATIONS_MAP[key as ValidationKey]])
    )
  ).options({ errors: { wrap: { label: false } } });

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) throw error;
}

export default validateData;
