import {
  mysqlTable,
  int,
  varchar,
  autoincrement,
  boolean,
} from "drizzle-orm/mysql-core";

// Course Schema
export const COURSES = mysqlTable("courses", {
  id: int("id", { length: 11 }).primaryKey(),
  course: varchar("course", { length: 50 }).notNull(),
});

// Students Schema
export const STUDENTS = mysqlTable("students", {
  id: int("id", { length: 11 }).autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }), //
  course: varchar("course", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
});

// Students Schema
export const ATTENDANCE = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId", { length: 11 }),
  present: boolean("present").default(false), //boolean by default is false
  day: int("day", { length: 11 }).notNull(), //hold days of the months
  date: varchar("date", { length: 20 }).notNull(), // holds mon and yr i.e 03/2020
});
