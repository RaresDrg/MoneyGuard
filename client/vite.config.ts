import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" &&
      visualizer({ open: true, filename: "stats.html" }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chart: ["chart.js"],
          chartReact: ["react-chartjs-2"],
          motion: ["framer-motion"],
          datepicker: ["react-datepicker", "@popperjs/core"],
        },
      },
    },
  },
}));
