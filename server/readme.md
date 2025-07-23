### Commands:

- `npm run build` &mdash; runs the TypeScript compiler to transpile TypeScript code into JavaScript. The compiled files will be placed in the dist directory.
- `npm run start` &mdash; starts the server in production mode.
- `npm run start:dev` &mdash; starts the server in development mode.
- `npm run lint` &mdash; runs code verification with ESLint.
- `npm run type-check` &mdash; checks the types in the code without generating any output files.
- `npm run create-env` &mdash; creates the .env file and inserts placeholders for the required environment variables

### Important:

- `.env file` &mdash; after it has been generated with the command above (npm run create-env), it must be filled out with the following:
  -DB_URI = the URI value of the database (MongoDB)
  -SALT_ROUNDS = number of salt rounds for bcrypt
  -ACCESS_TOKEN_SECRET = random secret string
  -RANDOM_BYTES_LENGTH = number of crypto bytes length
  -COOKIE_PARSER_SECRET = random secret string
  -EMAIL = email for sending messages (Nodemailer)
  -PASSWORD = password of the email's account (Nodemailer)
  -OPEN_EXCHANGE_RATES_API_KEY = the key used to access exchange rate data from the Open Exchange Rates API.
