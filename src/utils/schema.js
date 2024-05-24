import {
  mysqlTable,
  int,
  varchar,
  autoincrement,
} from "drizzle-orm/mysql-core";

// Grade Schema
export const GRADES = mysqlTable("grades", {
  id: int("id").primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

// Students Schema
export const STUDENTS = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }), // Ensure length is adequate
  grade: varchar("grade", { length: 10 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
});
