import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts", "src/contrast.ts", "src/generators.ts"],
  format: "esm",
  dts: true,
  clean: true,
});
