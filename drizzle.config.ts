import { defineConfig } from "drizzle-kit";
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);
export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: "./drizzle",
  schema: "./src/database/schema.ts",
});
