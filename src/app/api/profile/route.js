import { NextResponse } from "next/server";
import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq, and, like } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const fullName = searchParams.get("fullName");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");

  const conditions = [];
  if (fullName) conditions.push(like(STUDENTS.fullName, `%${fullName}%`));
  if (phone) conditions.push(eq(STUDENTS.phone, phone));
  if (address) conditions.push(like(STUDENTS.address, `%${address}%`));

  const result =
    conditions.length > 0
      ? await db
          .select()
          .from(STUDENTS)
          .where(and(...conditions))
      : await db.select().from(STUDENTS);

  return NextResponse.json(result);
}
