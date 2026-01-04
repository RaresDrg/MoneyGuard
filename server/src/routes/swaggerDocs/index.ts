import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocs = [`${__dirname}/*.js`];

console.log(swaggerDocs);

export default swaggerDocs;
