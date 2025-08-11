import { defineConfig } from "tsup";
import { postcssModules, sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  clean: true,
  tsconfig: "./tsconfig.app.json", // use the app tsconfig for building
  esbuildPlugins: [
    sassPlugin({
      type: "css",
      transform: postcssModules({
        localsConvention: "camelCase",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      }),
    }),
  ],
});
