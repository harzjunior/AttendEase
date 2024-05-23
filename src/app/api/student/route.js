const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";

// we will use this API in our GlobalApi.js
export async function POST(req, res) {
  // post the students from the table

  const data = await req.json();

  const result = await db.insert(STUDENTS).values({
    fullName: data?.fullName,
    grade: data?.grade,
    phone: data?.phone,
    address: data?.address,
  });

  return NextResponse.json(result);
  // return NextResponse(result);
}
