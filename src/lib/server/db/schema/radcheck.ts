import { mysqlTable, int, varchar, char, index } from 'drizzle-orm/mysql-core';

export const radcheck = mysqlTable(
	'radcheck',
	{
		id: int({ unsigned: true }).notNull().primaryKey().autoincrement(),
		UserName: varchar({ length: 64 }).notNull().default(''),
		Attribute: varchar({ length: 32 }).notNull().default(''),
		op: char({ length: 2 }).notNull().default('=='),
		Value: varchar({ length: 253 }).notNull().default('')
	},
	(table) => [index('UserName_idx').on(table.UserName)]
);

export type RadCheck = typeof radcheck.$inferSelect;
