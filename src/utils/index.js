require("dotenv").config();
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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

// require("dotenv").config();
// const mysql = require("mysql2/promise");
// const { drizzle } = require("drizzle-orm/mysql2");

// const createConnection = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     });
//     console.log("Database connected successfully");
//     return drizzle(connection);
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw error;
//   }
// };

// module.exports = { createConnection };
