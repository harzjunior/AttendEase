const { NextResponse } = require("next/server");

import { db } from "@/utils";
import { COURSES } from "@/utils/schema";

// we will use this API in our GlobalApi.js
export async function GET(req) {
  // get the course from the table
  const result = await db.select().from(COURSES);
  return NextResponse.json(result);
}
