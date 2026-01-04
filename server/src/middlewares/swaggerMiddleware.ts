import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../routes/swaggerDocs/index.js";
import { SERVER_URL } from "../config/config-env.js";
import {
  TRANSACTION_CATEGORIES,
  MIN_YEAR,
  CURRENT_YEAR,
} from "../constants/index.js";
import { fileURLToPath } from "url";
import path from "path";

function getApiDocsGlob() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const apiDocsDir = path.join(__dirname, "..", "routes", "swaggerDocs");

  const a = [`${apiDocsDir}/*.js`];
  console.log("a", a);

  console.log("swaggerDocs", swaggerDocs);

  return a;
}

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MoneyGuard API",
      version: "1.0.0",
      description: `<hr>
        <b>Overview:</b> Protected routes require authentication, which is established after successful response from: <b>register</b>, <b>login</b>, <b>update-password</b>, or <b>Google Auth</b>. Once authenticated, the server issues:
        <ul>
          <li>
            <b>A pair of secure, HTTP-only cookies</b> containing authentication tokens: <br>
            - accessToken: expires in 15 minutes <br>
            - refreshToken: expires in 24 hours <br>
            <b>* Important</b>: client requests must be sent with <b>"credentials: true"</b> enabled in order for these cookies to be stored automatically
          </li> <br>
          <li>
            <b>Session ID</b> <br>
            - It is returned in response headers as <b>"session-id"</b> <br>
            <b>* Important</b>: It must be included in subsequent requests as: "Authorization: <b>Bearer &lt;session-id&gt;</b>"
          </li>
        </ul>
        <b>Google Auth:</b> The Google sign-in flow takes place in two phases:
        <ul>
          <li>
            <b>Phase 1 - Redirect:</b> <br>
            - In order to initialize this process, the client must redirect the browser to: <b><i>"${SERVER_URL}/api/users/google-auth"</i></b>, to trigger the official Google sign-in screen <br>
            - After the user selects an account and completes sign-in, the server responds by redirecting back to the client with either: 
            <ul>
              <li><b>Success:</b> a temporary validation token in the query string: <i>"<b>...?googleAuthSuccess=&lt;ValidationToken&gt;</b>"</i></li>
              <li><b>Failure:</b> an error flag in the query string: <i>"<b>...?googleAuthFailed</b>"</i></li>
            </ul>
          </li> <br>
          <li>
            <b>Phase 2 - Finalize:</b> <br>
            - Once Phase 1 has been completed successfully, the client must extract the <b>validation token</b> from the query string and use it as described in the <b>"User"</b> routes section below
          </li>
        </ul>
        <b>Base URL:</b> => <a href='${SERVER_URL}'>${SERVER_URL}</a>
      `,
    },
    servers: [{ url: SERVER_URL, description: "Base URL" }],
    tags: [
      { name: "Welcome" },
      { name: "User" },
      { name: "Transactions" },
      { name: "Statistics" },
      { name: "Categories" },
      { name: "Exchange Rates" },
    ],
    components: {
      securitySchemes: {
        SessionAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "SessionID",
          description:
            "Enter the session-id value here. Swagger will send it as Bearer automatically.",
        },
      },
      utils: {
        authMethod: {
          type: "string",
          description:
            "Authentication method used by the user: local = Email/Password or google: Google OAuth Sign-in",
          enum: ["local", "google"],
          example: "local",
        },
        name: {
          type: "string",
          description: "Full name of the user",
          minLength: 3,
          maxLength: 50,
          example: "John Doe",
        },
        email: {
          type: "string",
          description: "A unique email address",
          format: "email",
          example: "johndoe@example.com",
        },
        password: {
          type: "string",
          description:
            "The password must be between 8 and 50 characters long, including at least one uppercase, one lowercase, and one digit.",
          minLength: 8,
          maxLength: 50,
          pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$",
          example: "Password123",
        },
        balance: {
          type: "number",
          description:
            "Current balance of the user's account, based on transaction history. Income entries increase the value, while expenses decrease it.",
          default: 0,
        },
        userData: {
          type: "object",
          properties: {
            name: { $ref: "#/components/utils/name" },
            email: { $ref: "#/components/utils/email" },
            balance: { $ref: "#/components/utils/balance" },
          },
        },
        owner: {
          type: "string",
          description:
            "The ID of the user who created this transaction (24-character hexadecimal ObjectId format)",
          example: "68c3528f6a30123a2c27d726",
        },
        type: {
          type: "string",
          description:
            "Specifies the transaction type. Must be either 'income' or 'expense'",
          enum: ["income", "expense"],
          example: "expense",
        },
        category: {
          type: "string",
          description:
            "Specifies the transaction category. Must be one of the predefined values, depending on the selected transaction type: for income, the only allowed category is 'Income'; for expense, any of the other predefined categories may be used",
          enum: [
            ...TRANSACTION_CATEGORIES.income,
            ...TRANSACTION_CATEGORIES.expense,
          ],
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
          description:
            "Unique identifier of the transaction (24-character hexadecimal ObjectId format)",
          example: "68c38ddff1d13da8f3e084a8",
        },
        transactionIDParam: {
          name: "transactionID",
          in: "path",
          description:
            "Unique identifier of the transaction (24-character hexadecimal ObjectId format)",
          required: true,
          schema: { type: "string" },
        },
        transactionData: {
          type: "object",
          properties: {
            id: { $ref: "#/components/utils/transactionID" },
            type: { $ref: "#/components/utils/type" },
            category: { $ref: "#/components/utils/category" },
            sum: { $ref: "#/components/utils/sum" },
            date: { $ref: "#/components/utils/date" },
            comment: { $ref: "#/components/utils/comment" },
          },
        },
        categoriesData: {
          type: "object",
          example: TRANSACTION_CATEGORIES,
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
        statisticsData: {
          type: "object",
          properties: {
            income: {
              type: "object",
              description:
                "Statistical breakdown of all income transactions within the selected period",
              properties: {
                total: {
                  type: "number",
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
                  type: "number",
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
        failedStatus: {
          type: "string",
          example: "failed",
        },
        successStatus: {
          type: "string",
          example: "success",
        },
        validationToken: {
          type: "string",
          description:
            "A one-time validation token used to authorize sensitive account actions. Expires in 15 minutes.",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            authMethod: { $ref: "#/components/utils/authMethod" },
            name: { $ref: "#/components/utils/name" },
            email: { $ref: "#/components/utils/email" },
            password: { $ref: "#/components/utils/password" },
            balance: { $ref: "#/components/utils/balance" },
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
        BadGatewayError: {
          description: "Bad Gateway",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example:
                      "We're experiencing issues with an external service. Please try again later",
                  },
                },
                required: ["status", "message"],
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
                    example:
                      "We're experiencing technical difficulties. Please try again later",
                  },
                },
                required: ["status", "message"],
              },
            },
          },
        },
        DuplicateEmailError: {
          description: "Conflict: email already used",
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
                required: ["status", "message"],
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
                    example:
                      "There is no account associated with this email address",
                  },
                },
                required: ["status", "message"],
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
                required: ["status", "message"],
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
                    example: "Access denied: invalid or expired session",
                  },
                },
                required: ["status", "message"],
              },
            },
          },
        },
        CastError: {
          description: "Invalid ID format",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { $ref: "#/components/utils/failedStatus" },
                  message: {
                    type: "string",
                    example:
                      "Invalid ID format - it must be a 24-character hexadecimal string",
                  },
                },
                required: ["status", "message"],
              },
            },
          },
        },
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
                      "The required data are missing or do not meet the requirements",
                  },
                },
                required: ["status", "message"],
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
                required: ["status", "message"],
              },
            },
          },
        },
      },
    },
  },
  apis: getApiDocsGlob(),
});

const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];

export default swaggerMiddleware;
