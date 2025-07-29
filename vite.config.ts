import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    // Add these options to reduce file descriptor usage
    poolOptions: {
      threads: {
        maxThreads: 1,
        minThreads: 1,
      },
    },
    // Reduce file watching and collection
    watch: false,
    isolate: false,
  },
});
