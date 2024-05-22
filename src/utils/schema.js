import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const GRADES = mysqlTable("grades", {
  id: int("id").primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

// declaring enum in database
export const countries = mysqlTable(
  "countries",
  {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (countries) => ({
    nameIndex: uniqueIndex("name_idx").on(countries.name),
  })
);

export const cities = mysqlTable("cities", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: int("country_id").references(() => countries.id),
  popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
});
