import { mysqlTable, int, varchar, char, index } from 'drizzle-orm/mysql-core';

export const radgroupcheck = mysqlTable(
	'radgroupcheck',
	{
		id: int({ unsigned: true }).notNull().primaryKey().autoincrement(),
		GroupName: varchar({ length: 64 }).notNull().default(''),
		Attribute: varchar({ length: 32 }).notNull().default(''),
		op: char({ length: 2 }).notNull().default('=='),
		Value: varchar({ length: 253 }).notNull().default('')
	},
	(table) => [index('GroupName_idx').on(table.GroupName)]
);

export type RadGroupCheck = typeof radgroupcheck.$inferSelect;
