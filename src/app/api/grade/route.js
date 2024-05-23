const { NextResponse } = require("next/server");

import { db } from "@/utils";
import { GRADES } from "@/utils/schema";

export async function GET(req) {
  // get the grades from the table
  const result = await db.select().from(GRADES);
  return NextResponse.json(result);
}
