import { mysqlTable, int, varchar, index } from 'drizzle-orm/mysql-core';

export const nas = mysqlTable(
	'nas',
	{
		id: int().notNull().primaryKey().autoincrement(),
		nasname: varchar({ length: 128 }).notNull(),
		shortname: varchar({ length: 32 }),
		type: varchar({ length: 30 }).default('other'),
		ports: int(),
		secret: varchar({ length: 60 }).notNull().default('secret'),
		community: varchar({ length: 50 }),
		description: varchar({ length: 200 }).default('RADIUS Client')
	},
	(table) => [index('nasname_idx').on(table.nasname)]
);

export type Nas = typeof nas.$inferSelect;
