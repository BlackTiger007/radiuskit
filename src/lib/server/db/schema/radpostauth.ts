import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const radpostauth = mysqlTable('radpostauth', {
	id: int().notNull().primaryKey().autoincrement(),
	user: varchar({ length: 64 }).notNull().default(''),
	pass: varchar({ length: 64 }).notNull().default(''),
	reply: varchar({ length: 32 }).notNull().default(''),
	date: timestamp().notNull()
});

export type RadPostAuth = typeof radpostauth.$inferSelect;
