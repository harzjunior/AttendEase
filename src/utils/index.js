require("dotenv").config();
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      connectTimeout: 10000, // 10 seconds
    });
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

const connection = await createConnection();
export const db = drizzle(connection);
 