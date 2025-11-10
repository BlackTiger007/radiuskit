import { mysqlTable, varchar, datetime } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export type Session = typeof session.$inferSelect;
