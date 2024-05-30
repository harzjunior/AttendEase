const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq } from "drizzle-orm";

// we will use this API in our GlobalApi.js

//get data
//we need to connect attendance table and student table together, therefore, we need to fetch all the student table
export async function GET(req) {
  // get the attendance from the table
  const { searchParams } = new URL(req.url);
  const course = searchParams.get("course");
  const month = searchParams.get("month");

  try {
    const result = await db
      .select({
        fullName: STUDENTS.fullName,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        course: STUDENTS.course,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(
        ATTENDANCE,
        and(eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month))
      )
      .where(eq(STUDENTS.course, course));

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}

//post data
export async function POST(req, res) {
  // post the students from the table

  const data = await req.json(); //get the body

  const result = await db.insert(ATTENDANCE).values({
    studentId: data.studentId,
    present: data.present,
    day: data.day,
    date: data.date,
  });

  return NextResponse.json(result);
}

//Delete data
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  const day = searchParams.get("day");
  const date = searchParams.get("date");

  try {
    const result = await db
      .delete(ATTENDANCE)
      .where(
        and(
          eq(ATTENDANCE.studentId, studentId),
          eq(ATTENDANCE.day, day),
          eq(ATTENDANCE.date, date)
        )
      );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to delete attendance record" },
      { status: 500 }
    );
  }
}
