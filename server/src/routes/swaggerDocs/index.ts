import path from "path";
import { fileURLToPath } from "url";
import { IN_DEVELOPMENT } from "../../config/config-env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocs = [`${__dirname}/*.js`];

const swaggerDocs2 = IN_DEVELOPMENT
  ? [`${__dirname}/*.ts`]
  : [`${__dirname}/*.js`];

console.log(swaggerDocs);
console.log(swaggerDocs2);

export default swaggerDocs;
