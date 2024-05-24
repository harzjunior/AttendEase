import { db } from "./index.js";

async function testDbConnection() {
  try {
    // Example query
    const query = db.select("*").from("students").limit(1);
    const result = await db.execute(query);

    console.log("Database connected successfully");
    console.log("Query result:", result);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

testDbConnection();
