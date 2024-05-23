import {
  mysqlTable,
  int,
  varchar,
  autoincrement,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// Grade Schema
export const GRADES = mysqlTable("grades", {
  id: int("id").primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

// Students Schema
export const STUDENTS = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 50 }).notNull(),
  grade: varchar("grade", { length: 10 }).notNull(),
  phone: int("phone", { length: 20 }).notNull(),
  address: varchar("address", { length: 100 }).notNull(),
});
