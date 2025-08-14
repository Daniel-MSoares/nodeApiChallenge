import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["html", "text-summary", "text"],
      all: true,
      include: ["src/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        "src/tests/**",
        "src/server.ts",
        "src/app.ts",
        "src/database/**",
      ],
    },
  },
});
