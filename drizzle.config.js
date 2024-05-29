require("dotenv").config();

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/utils/schema.js",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectTimeout: 10000, // 10 seconds
  },
});
