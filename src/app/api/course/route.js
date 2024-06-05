const { NextResponse } = require("next/server");

import { db } from "@/utils";
import { COURSES } from "@/utils/schema";

// we will use this API in our GlobalApi.js
export async function GET(req) {
  // get the course from the table
  const result = await db.select().from(COURSES);
  return NextResponse.json(result);
}

// Post a new course
export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    const courseNumber = data?.courseNumber || data?.id;
    const course = data?.course;

    if (!courseNumber || !course) {
      throw new Error("Missing courseId or course");
    }

    const result = await db.insert(COURSES).values({
      courseNumber: courseNumber,
      course: course,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting course:", error);
    return NextResponse.json(
      { error: "Error inserting course" },
      { status: 500 }
    );
  }
}
