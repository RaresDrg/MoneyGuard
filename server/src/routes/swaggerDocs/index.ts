import path from "path";
import { fileURLToPath } from "url";
import { IN_DEVELOPMENT } from "../../config/config-env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocs = IN_DEVELOPMENT
  ? [`${__dirname}/*.ts`]
  : [`${__dirname}/*.js`];

export default swaggerDocs;
