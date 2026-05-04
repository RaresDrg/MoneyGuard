import mongoose from "mongoose";
import app from "./app.js";
import { DB_URI, PORT } from "./config/config-env.js";

(async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("🆗 [MongoDB] Already connected");
    } else {
      await mongoose.connect(DB_URI);
      console.log("✅ [MongoDB] Connected successfully");
    }

    app.listen(PORT, () =>
      console.log(`✅ [Server] Listening on port: ${PORT}`),
    );
  } catch (error) {
    console.error("❌ [Startup] Failed to initialize");
    console.error(error);
    process.exit(1);
  }
})();
