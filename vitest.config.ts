import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@packages/ui": resolve(__dirname, "./packages/ui/src"),
      "@packages/core": resolve(__dirname, "./packages/core/src"),
      "react-native": "react-native-web",
    },
  },
});
