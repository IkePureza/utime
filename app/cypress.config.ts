import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3020",
    supportFile: "cypress/support/e2e.ts",
  },
});
