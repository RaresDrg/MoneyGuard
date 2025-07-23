import mongoose from "mongoose";
import app from "./app.js";
import { DB_URI, PORT } from "./config/config-env.js";

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
