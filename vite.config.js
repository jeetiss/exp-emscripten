import { defineConfig } from "vite";

export default defineConfig({
  test: {
    exclude: ["**/emsdk-main/**"],
  },
});
