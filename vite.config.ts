/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  plugins: [
    react(),
    svgr(),
    libInjectCss(),
    dts({
      tsconfigPath: "tsconfig.app.json",
      exclude: ["**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "react-formkit-lite",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "simplebar-react"],
      input: Object.fromEntries(
        globSync(["lib/components/**/*.tsx", "lib/index.ts"]).map((file) => {
          const entryName = path.relative(
            "lib",
            file.slice(0, file.length - path.extname(file).length),
          );

          const entryUrl = fileURLToPath(new URL(file, import.meta.url));
          return [entryName, entryUrl];
        }),
      ),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
