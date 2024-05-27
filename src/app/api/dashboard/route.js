import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  // get the attendance from the table
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const grade = searchParams.get("grade");

  try {
    const result = await db
      .select({
        day: ATTENDANCE.day,
        presentCount: sql`COUNT(${ATTENDANCE.day})`.as("presentCount"),
      })
      .from(ATTENDANCE)
      .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
      .groupBy(ATTENDANCE.day)
      .where(and(eq(ATTENDANCE.date, date), eq(STUDENTS.grade, grade)))
      .orderBy(desc(ATTENDANCE.day))
      .limit(7);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Query Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}
