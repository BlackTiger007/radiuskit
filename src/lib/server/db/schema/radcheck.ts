import type { RadiusOperator } from '$lib/types/operator';
import { mysqlTable, int, varchar, char, index } from 'drizzle-orm/mysql-core';

export const radcheck = mysqlTable(
	'radcheck',
	{
		id: int({ unsigned: true }).notNull().autoincrement().primaryKey(),
		username: varchar({ length: 64 }).notNull().default(''),
		attribute: varchar({ length: 64 }).notNull().default(''),
		op: char({ length: 2 }).notNull().$type<RadiusOperator>().default('=='),
		value: varchar({ length: 253 }).notNull().default('')
	},
	(table) => [index('username_idx').on(table.username)]
);

export type RadCheck = typeof radcheck.$inferSelect;
