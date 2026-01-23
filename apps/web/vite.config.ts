import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "automatic",
              importSource: "nativewind",
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@packages/ui": resolve(__dirname, "../../packages/ui"),
      "@packages/core": resolve(__dirname, "../../packages/core"),
      "react-native": "react-native-web",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [
        ".web.js",
        ".web.ts",
        ".web.tsx",
        ".js",
        ".ts",
        ".tsx",
      ],
    },
  },
});
