import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    portfolio: "src/portfolio.ts",
    styles: "src/styles/index.css",
  },
  format: ["esm"],
  dts: {
    entry: {
      index: "src/index.ts",
      portfolio: "src/portfolio.ts",
    },
  },
  outDir: "dist",
  clean: true,
  sourcemap: true,
  target: "es2022",
  tsconfig: "./tsconfig.lib.json",
  external: ["react", "react-dom", "react/jsx-runtime"],
});
