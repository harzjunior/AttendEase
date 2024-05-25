const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { ATTENDANCE } from "@/utils/schema";
import { eq } from "drizzle-orm";

// we will use this API in our GlobalApi.js

//post data
export async function POST(req, res) {
  // post the students from the table

  const data = await req.json();

  const result = await db.insert(ATTENDANCE).values({
    studentId: data?.studentId,
    present: data?.present,
    day: data?.day,
    date: data?.date,
  });

  return NextResponse.json(result);
}

//get data
export async function GET(req) {
  // get the attendance from the table
  const result = await db.select().from(ATTENDANCE);
  return NextResponse.json(result);
}

//delete data
export async function DELETE(req) {
  // get the attendance from the table
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("id"); //we can get the data from pops (data.id) in where we'd use it e.g in StudentTableList component

  const result = await db
    .delete(ATTENDANCE)
    .where(eq(ATTENDANCE.id, parseInt(_id))); //delete by student id that matches searchParam _id
  return NextResponse.json({ success: true, result });
}
