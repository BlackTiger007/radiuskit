import { mysqlTable, int, varchar, primaryKey, index } from 'drizzle-orm/mysql-core';

export const radusergroup = mysqlTable(
	'radusergroup',
	{
		UserName: varchar({ length: 64 }).notNull().default(''),
		GroupName: varchar({ length: 64 }).notNull().default(''),
		priority: int().notNull().default(1)
	},
	(table) => [
		primaryKey({ columns: [table.UserName, table.GroupName] }),
		index('UserName_idx').on(table.UserName)
	]
);

export type RadUserGroup = typeof radusergroup.$inferSelect;
