const { NextResponse } = require("next/server");
import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, isNull, or } from "drizzle-orm";

// we will use this API in our GlobalApi.js

//get data
//we need to connect attendance table and student table together, therefore, we need to fetch all the student table
export async function GET(req) {
  // get the attendance from the table
  const { searchParams } = new URL(req.url);
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  try {
    const result = await db
      .select({
        fullName: STUDENTS.fullName,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId))
      .where(eq(STUDENTS.grade, grade))
      .where(or(eq(ATTENDANCE.date, month), isNull(eq(ATTENDANCE.date)))); //also include students who do not have any attendance records for the specified month

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}
