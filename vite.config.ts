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

const CSS_PREFIX = "formkit-lite-";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dtsOptions = {
  exclude: ["./examples"],
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
    const fileName = path.basename(filePath);
    const basePath = path.relative(__dirname, path.dirname(filePath));
    if (basePath.startsWith("dist/components") && fileName === "index.d.ts") {
      return false;
    }

    const formattedFilePath = path.resolve("dist", fileName.replace("Field", ""));
    const newFilePath = fileURLToPath(new URL(formattedFilePath, import.meta.url));

    let formattedContent: string;
    switch (fileName) {
      case "index.d.ts":
        formattedContent = content
          .replaceAll("components/", "")
          .replaceAll("Checkbox/", "")
          .replaceAll("Radio/", "")
          .replace("./RadioField", "./Radio")
          .replace("./CheckboxField", "./Checkbox");
        break;
      case "types.d.ts":
        formattedContent = content
          .replace("./components/Select", "./Select")
          .replace("./components/Select/SelectOption", "./SelectOption");
        break;
      default:
        formattedContent = content.replaceAll("../../types", "./types");
    }

    return {
      filePath: newFilePath,
      content: formattedContent,
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
              external: ["react", "react/jsx-runtime", "simplebar-react", "react-imask"],
              input: Object.fromEntries(
                globSync([
                  "src/components/Select/SelectField.tsx",
                  "src/components/Text/TextField.tsx",
                  "src/components/Range/RangeField.tsx",
                  "src/components/Date/DateField.tsx",
                  "src/components/Checkbox/CheckboxField.tsx",
                  "src/components/Checkbox/CheckboxGroup.tsx",
                  "src/components/Radio/RadioField.tsx",
                  "src/components/Radio/RadioGroup.tsx",
                  "src/components/Switch/SwitchField.tsx",
                  "src/components/UploadMultipleFiles/UploadMultipleFiles.tsx",
                  "src/components/UploadArea/UploadArea.tsx",
                  "src/components/Badge/Badge.tsx",
                  "src/components/Button/Button.tsx",
                  "src/components/Header/Header.tsx",
                  "src/components/Loader/Loader.tsx",
                  "src/utils/phoneNumberMask.ts",
                  "src/utils/dateMask.ts",
                  "src/utils/otherMasks.ts",
                  "src/index.ts",
                ]).map((file) => {
                  let entryName = path.basename(file, path.extname(file));
                  const entryUrl = fileURLToPath(new URL(file, import.meta.url));
                  if (file.startsWith("src/components")) {
                    entryName = entryName.replace("Field", "");
                  }
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
          return `${CSS_PREFIX}${name}`;
        },
      },
    },
  };

  return config;
});
