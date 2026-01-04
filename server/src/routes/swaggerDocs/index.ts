import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocs = [
  path.join(__dirname, "..", "routes", "exchangeRatesDocs.{ts,js}"),
  path.join(__dirname, "transactionsDocs.{ts,js}"),
  path.join(__dirname, "userDocs.{ts,js}"),
  path.join(__dirname, "welcomeDocs.{ts,js}"),
];

console.log(swaggerDocs);

export default swaggerDocs;
