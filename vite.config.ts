/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import svgr from "vite-plugin-svgr";
import { globSync } from "glob";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import type { PluginOptions } from "unplugin-dts";
import type { UserConfig, BuildEnvironmentOptions } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dtsOptions = {
  exclude: [],
  tsconfigPath: "./tsconfig.app.json",
  outDirs: "./dist",
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
  const config: UserConfig = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react(), svgr(), ...(isDemo ? [] : [dts(dtsOptions)])],
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
              entry: path.resolve(__dirname, "src/index.ts"),
              name: "react-formkit-lite",
              formats: ["es"],
              cssFileName: "index",
            },
            outDir: path.resolve(__dirname, "./dist"),
            rollupOptions: {
              external: ["react", "react/dom", "react/jsx-runtime", "simplebar-react"],
              input: Object.fromEntries(
                globSync([
                  "src/components/**/*.tsx",
                  "src/utils/phoneNumberMask.ts",
                  "src/utils/dateMask.ts",
                  "src/utils/otherMasks.ts",
                  "src/index.ts",
                ]).map((file) => {
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
    css: {
      modules: {
        generateScopedName: (name) => {
          return `formkit-lite-${name}`;
        },
      },
    },
  };

  return config;
});
