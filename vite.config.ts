/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import svgr from "vite-plugin-svgr";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { globSync } from "glob";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import type { PluginOptions } from "unplugin-dts";
import type { BuildEnvironmentOptions } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dtsOptions = {
  exclude: ["**/*.stories.tsx"],
  tsconfigPath: "./tsconfig.app.json",
  beforeWriteFile: (
    filePath: string,
    content: string,
  ):
    | {
        filePath: string;
        content: string;
      }
    | boolean => {
    const basename = path.basename(filePath);
    const filename = path.join("dist", basename);
    const relativePath = path.relative(__dirname, filePath);

    // skip index.tsx aliases for components
    if (relativePath.startsWith("dist/components") && basename === "index.d.ts") {
      return false;
    }

    return {
      filePath: fileURLToPath(new URL(filename, import.meta.url)),
      content: content.replace("from '../../types'", "from './types'"),
    };
  },
} as PluginOptions;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";
  const isDev = process.env.NODE_ENV === "development";
  const buildExamples = isDemo || isDev;
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./lib"),
      },
    },
    plugins: [react(), svgr(), ...(isDemo ? [] : [libInjectCss(), dts(dtsOptions)])],
    root: buildExamples ? "examples" : ".",
    base: isDemo ? "/react-formkit-lite/" : undefined,
    build: isDemo
      ? ({
          outDir: path.resolve(__dirname, "./dist"),
          emptyOutDir: true,
        } as BuildEnvironmentOptions)
      : isDev
        ? undefined // no need to build with vite dev server
        : {
            lib: {
              entry: path.resolve(__dirname, "lib/index.ts"),
              name: "react-formkit-lite",
              formats: ["es"],
            },
            rollupOptions: {
              external: [
                "react",
                "react/dom",
                "react/jsx-runtime",
                "react-responsive",
                "simplebar-react",
              ],
              input: Object.fromEntries(
                globSync(["lib/components/**/*.tsx", "lib/index.ts"]).map((file) => {
                  const entryName = path.basename(file, path.extname(file));
                  const entryUrl = fileURLToPath(new URL(file, import.meta.url));
                  return [entryName, entryUrl];
                }),
              ),
              output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name].[hash].js",
              },
            },
          },
  };
});
