import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { IN_DEVELOPMENT } from "../config/config-env.js";
import {
  ALL_CATEGORIES,
  MIN_YEAR,
  CURRENT_YEAR,
  TRANSACTION_CATEGORIES,
} from "../constants/index.js";

function getApiDocsGlob() {
  if (IN_DEVELOPMENT) return "src/routes/swaggerDocs/*.ts";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const apiDocsDir = path.join(__dirname, "..", "routes", "swaggerDocs");
  return `${apiDocsDir}/*.js`;
}

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MoneyGuard API",
      version: "1.0.0",
      description:
        "<hr></hr><strong>Description:</strong> MoneyGuard provides secure user authentication, supports personal budgeting through robust transaction management and statistical tracking over custom time ranges, and delivers daily exchange rates sourced from OpenExchangeRates, with USD as the base currency. All endpoints enforce strict validation and return consistent, structured responses. <br></br> <strong>Important:</strong> Authentication occurs during register, login, and password update flows. In all cases, the server returns a token pair: <b>accessToken</b> and <b>refreshToken</b>, as secure, HTTP-only cookies, which must be included in subsequent requests to access <b>protected endpoints</b>. <br></br><strong>Base URL:</strong> => <a href='https://moneyguardserver.vercel.app'>https://moneyguardserver.vercel.app</a>",
    },
    tags: [
      { name: "User" },
      { name: "Transactions" },
      { name: "Statistics" },
      { name: "Categories" },
      { name: "Exchange Rates" },
    ],
    components: {
      utils: {
        name: {
          type: "string",
          minLength: 3,
          maxLength: 50,
          example: "John Doe",
        },
        email: {
          type: "string",
          description: "An unique email address",
          format: "email",
          example: "johndoe@example.com",
        },
        password: {
          type: "string",
          description:
            "The password must be between 8 and 50 characters long, including at least one uppercase, one lowercase, and one digit.",
          minLength: 8,
          maxLength: 50,
          pattern: "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])/",
          example: "Password123",
        },
        balance: {
          type: "number",
          description:
            "Current balance of the user's account, based on transaction history. Income entries increase the value, while expenses decrease it.",
          default: 0,
        },
        accessToken: {
          type: "string",
          description:
            "It's a JSON Web Token (JWT) used for authentication strategy. Expiry time: 15 min",
        },
        refreshToken: {
          type: "string",
          description:
            "It's a token used for authentication strategy: it refreshes the access token when it expires. Expiry time: 1 day",
        },
        validationToken: {
          type: "string",
          description:
            "It's a token used to validate the password update request. Expiry time: 15 minutes.",
        },
        owner: {
          type: "string",
          description: "The ID of the user who created this transaction",
          ref: "users",
          example: "68c3528f6a30123a2c27d726",
        },
        type: {
          type: "string",
          description:
            "Specifies the transaction type. Must be one of the predefined values",
          enum: ["income", "expense"],
          example: "expense",
        },
        category: {
          type: "string",
          description:
            "Specifies the transaction category. Must be one of the predefined values, depending on the selected transaction type: for income, the only allowed category is 'Income'; for expense, any of the other predefined categories may be used",
          enum: ALL_CATEGORIES,
          example: "Car",
        },
        sum: {
          type: "number",
          description:
            "Specifies the transaction amount. Must be greater than 0 and less than 100,000,000",
          example: 500,
        },
        date: {
          type: "string",
          description: `Specifies the transaction date. Must be in ISO format and must be between 01.01.${MIN_YEAR} and 31.12.${CURRENT_YEAR}`,
          format: "date-time",
          example: "2025-09-12T00:00:00.000Z",
        },
        comment: {
          type: "string",
          description: `Specifies the description of the transaction. Must be between 5 and 200 characters long`,
          minLength: 5,
          maxLength: 200,
          example: "Regular car maintenance",
        },
        transactionID: {
          type: "string",
          description: "Unique identifier of the transaction",
          example: "68c38ddff1d13da8f3e084a8",
        },
        startDate: {
          name: "startDate",
          in: "query",
          description: `Start date of the analysis period. Must be an **ISO-formatted** date between **01.01.${MIN_YEAR}** and **31.12.${CURRENT_YEAR}**`,
          required: true,
          schema: { type: "string", format: "date-time" },
          example: "2025-09-01T00:00:00.000Z",
        },
        endDate: {
          name: "endDate",
          in: "query",
          description: `End date of the analysis period. Must be an **ISO-formatted** date between **01.01.${MIN_YEAR}** and **31.12.${CURRENT_YEAR}**`,
          required: true,
          schema: { type: "string", format: "date-time" },
          example: "2025-09-30T00:00:00.000Z",
        },
        rates: {
          type: "object",
          description:
            "Currency exchange rates indexed by currency code. Each value represents the rate relative to **USD**.",
          example: {
            EUR: 0.93,
            GBP: 0.81,
            AUD: 1.54,
            JPY: 147.32,
            RON: 4.95,
          },
        },
        expiresAt: {
          type: "string",
          format: "date-time",
          description:
            "Timestamp indicating when the exchange rate data expires. Always set to midnight UTC of the current calendar day.",
          example: "2025-09-13T23:59:59.999Z",
        },
        succesStatus: {
          type: "string",
          example: "success",
        },
        failedStatus: {
          type: "string",
          example: "failed",
        },
        userData: {
          type: "object",
          properties: {
            name: { $ref: "#/components/utils/name" },
            email: { $ref: "#/components/utils/email" },
            balance: { $ref: "#/components/utils/balance" },
          },
        },
        transactionData: {
          type: "object",
          properties: {
            type: { $ref: "#/components/utils/type" },
            category: { $ref: "#/components/utils/category" },
            sum: { $ref: "#/components/utils/sum" },
            date: { $ref: "#/components/utils/date" },
            comment: { $ref: "#/components/utils/comment" },
            _id: { $ref: "#/components/utils/transactionID" },
          },
        },
        statisticsData: {
          type: "object",
          properties: {
            income: {
              type: "object",
              description:
                "Statistical breakdown of all income transactions within the selected period",
              properties: {
                total: {
                  description: "Total income amount",
                  example: 2000,
                },
                summary: {
                  type: "object",
                  description: "Income breakdown by category",
                  example: Object.fromEntries(
                    TRANSACTION_CATEGORIES.income.map((category) => [
                      category,
                      2000,
                    ])
                  ),
                },
              },
            },
            expense: {
              type: "object",
              description:
                "Statistical breakdown of all expense transactions within the selected period",
              properties: {
                total: {
                  description: "Total expense amount",
                  example: 4500,
                },
                summary: {
                  type: "object",
                  description: "Expense breakdown by category",
                  example: Object.fromEntries(
                    TRANSACTION_CATEGORIES.expense.map((category, i) => [
                      category,
                      100 * i,
                    ])
                  ),
                },
              },
            },
            balance: {
              type: "number",
              description:
                "Net balance for the selected period, calculated as total income minus total expenses",
              example: -2500,
            },
          },
        },
        categoriesData: {
          type: "object",
          example: TRANSACTION_CATEGORIES,
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { $ref: "#/components/utils/name" },
            email: { $ref: "#/components/utils/email" },
            password: { $ref: "#/components/utils/password" },
            balance: { $ref: "#/components/utils/balance" },
            accessToken: { $ref: "#/components/utils/accessToken" },
            refreshToken: { $ref: "#/components/utils/refreshToken" },
            validationToken: { $ref: "#/components/utils/validationToken" },
          },
          required: ["name", "email", "password"],
        },
        Transaction: {
          type: "object",
          properties: {
            owner: { $ref: "#/components/utils/owner" },
            type: { $ref: "#/components/utils/type" },
            category: { $ref: "#/components/utils/category" },
            sum: { $ref: "#/components/utils/sum" },
            date: { $ref: "#/components/utils/date" },
            comment: { $ref: "#/components/utils/comment" },
          },
          required: ["owner", "type", "category", "sum", "date", "comment"],
        },
        ExchangeRates: {
          type: "object",
          properties: {
            rates: { $ref: "#/components/utils/rates" },
            expiresAt: { $ref: "#/components/utils/expiresAt" },
          },
          required: ["rates", "expiresAt"],
        },
      },
      responses: {
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example:
                      "The submitted data does not meet the requirements",
                  },
                },
              },
            },
          },
        },
        QueryParamsError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example:
                      "One or more query parameters have an invalid format",
                  },
                },
              },
            },
          },
        },
        CastError: {
          description: "Invalid transaction ID format",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example: "Invalid ID format in URL",
                  },
                },
              },
            },
          },
        },
        UnauthorizedError: {
          description: "Unauthorized access",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
        ConflictError: {
          description: "Conflict",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example:
                      "You can't use this email. It belongs to another account",
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
        UserNotFoundError: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example: "There is no account associated with this email",
                  },
                },
              },
            },
          },
        },
        TransactionNotFoundError: {
          description: "Transaction not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example: "Transaction not found",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [getApiDocsGlob()],
});

const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];

export default swaggerMiddleware;
