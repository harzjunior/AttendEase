const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";

// we will use this API in our GlobalApi.js

//post data
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
}

//get data
export async function GET(req) {
  // get the grades from the table
  const result = await db.select().from(STUDENTS);
  return NextResponse.json(result);
}
