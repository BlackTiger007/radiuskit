import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const radpostauth = mysqlTable('radpostauth', {
	id: int().notNull().autoincrement().primaryKey(),
	username: varchar({ length: 64 }).notNull().default(''),
	pass: varchar({ length: 64 }).notNull().default(''),
	reply: varchar({ length: 32 }).notNull().default(''),
	authdate: timestamp({ fsp: 6, mode: 'string' }).notNull().defaultNow().onUpdateNow(),
	class: varchar({ length: 64 }).notNull().default('')
});

export type RadPostAuth = typeof radpostauth.$inferSelect;
