import { mysqlTable, int, varchar, index } from 'drizzle-orm/mysql-core';

export const radusergroup = mysqlTable(
	'radusergroup',
	{
		id: int({ unsigned: true }).notNull().autoincrement().primaryKey(),
		username: varchar({ length: 64 }).notNull().default(''),
		groupname: varchar({ length: 64 }).notNull().default(''),
		priority: int().notNull().default(1)
	},
	(table) => [index('username_idx').on(table.username)]
);

export type RadUserGroup = typeof radusergroup.$inferSelect;
