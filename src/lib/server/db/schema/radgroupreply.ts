import { mysqlTable, int, varchar, char, index } from 'drizzle-orm/mysql-core';

export const radgroupreply = mysqlTable(
	'radgroupreply',
	{
		id: int({ unsigned: true }).notNull().autoincrement().primaryKey(),
		groupname: varchar({ length: 64 }).notNull().default(''),
		attribute: varchar({ length: 64 }).notNull().default(''),
		op: char({ length: 2 }).notNull().default('='),
		value: varchar({ length: 253 }).notNull().default('')
	},
	(table) => [index('groupname_idx').on(table.groupname)]
);

export type RadGroupReply = typeof radgroupreply.$inferSelect;
