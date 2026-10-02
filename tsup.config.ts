import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  clean: true,
  sourcemap: true,
  target: "es2022",
  tsconfig: "./tsconfig.lib.json",
  external: ["react", "react-dom", "react/jsx-runtime"],
});
