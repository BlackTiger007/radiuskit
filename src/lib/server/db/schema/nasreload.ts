import { mysqlTable, varchar, datetime } from 'drizzle-orm/mysql-core';

export const nasreload = mysqlTable('nasreload', {
	nasipaddress: varchar({ length: 15 }).notNull().primaryKey(),
	reloadtime: datetime().notNull()
});

export type NasReload = typeof nasreload.$inferSelect;
