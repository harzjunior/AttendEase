const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";

// we will use this API in our GlobalApi.js

//post data
export async function POST(req, res) {
  // post the students from the table

  const data = await req.json();

  const result = await db.insert(STUDENTS).values({
    fullName: data?.fullName,
    course: data?.course,
    phone: data?.phone,
    address: data?.address,
  });

  return NextResponse.json(result);
}

//get data
export async function GET(req) {
  // get the attendance from the table
  const result = await db.select().from(STUDENTS);
  return NextResponse.json(result);
}

//delete data
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("id");

  if (!_id) {
    return NextResponse.json(
      { success: false, message: "ID not provided" },
      { status: 400 }
    );
  }

  const result = await db
    .delete(STUDENTS)
    .where(eq(STUDENTS.id, parseInt(_id)));

  if (result) {
    return NextResponse.json({ success: true, result });
  } else {
    return NextResponse.json(
      { success: false, message: "Deletion failed" },
      { status: 500 }
    );
  }
}

//patch data
export async function PATCH(req) {
  const data = await req.json();
  const { id, ...updateData } = data;

  const result = await db
    .update(STUDENTS)
    .set(updateData)
    .where(eq(STUDENTS.id, parseInt(id)));

  return NextResponse.json({ success: true, result });
}
