import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "sales",
      filename: "remoteEntry.js",
      exposes: {
        "./modules": "./src/modules/index.ts",
        "./App": "./src/App.tsx",
      },

      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-redux",
        "tailwindcss",
        "@tanstack/react-query",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
