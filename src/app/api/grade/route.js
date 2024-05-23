const { NextResponse } = require("next/server");

import { db } from "@/utils";
import { GRADES } from "@/utils/schema";

// we will use this API in our application
export async function GET(req) {
  // get the grades from the table
  const result = await db.select().from(GRADES);
  return NextResponse.json(result);
}
