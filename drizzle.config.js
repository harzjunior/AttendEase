import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/utils/schema.js",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "root",
    database: "attendease_db",
    password: "",
  },
});
