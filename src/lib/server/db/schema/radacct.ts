import { mysqlTable, bigint, int, varchar, datetime, index } from 'drizzle-orm/mysql-core';

// ----------------- radacct -----------------
export const radacct = mysqlTable(
	'radacct',
	{
		RadAcctId: bigint({ mode: 'bigint' }).notNull().primaryKey().autoincrement(),
		AcctSessionId: varchar({ length: 32 }).notNull().default(''),
		AcctUniqueId: varchar({ length: 32 }).notNull().default(''),
		UserName: varchar({ length: 64 }).notNull().default(''),
		Realm: varchar({ length: 64 }).default(''),
		NASIPAddress: varchar({ length: 15 }).notNull().default(''),
		NASPortId: varchar({ length: 15 }),
		NASPortType: varchar({ length: 32 }),
		AcctStartTime: datetime().notNull().default(new Date('0')),
		AcctStopTime: datetime().notNull().default(new Date('0')),
		AcctSessionTime: int(),
		AcctAuthentic: varchar({ length: 32 }),
		ConnectInfo_start: varchar({ length: 50 }),
		ConnectInfo_stop: varchar({ length: 50 }),
		AcctInputOctets: bigint({ mode: 'bigint' }),
		AcctOutputOctets: bigint({ mode: 'bigint' }),
		CalledStationId: varchar({ length: 50 }).notNull().default(''),
		CallingStationId: varchar({ length: 50 }).notNull().default(''),
		AcctTerminateCause: varchar({ length: 32 }).notNull().default(''),
		ServiceType: varchar({ length: 32 }),
		FramedProtocol: varchar({ length: 32 }),
		FramedIPAddress: varchar({ length: 15 }).notNull().default(''),
		AcctStartDelay: int(),
		AcctStopDelay: int()
	},
	(table) => [
		index('UserName_idx').on(table.UserName),
		index('FramedIPAddress_idx').on(table.FramedIPAddress),
		index('AcctSessionId_idx').on(table.AcctSessionId),
		index('AcctUniqueId_idx').on(table.AcctUniqueId),
		index('AcctStartTime_idx').on(table.AcctStartTime),
		index('AcctStopTime_idx').on(table.AcctStopTime),
		index('NASIPAddress_idx').on(table.NASIPAddress)
	]
);

export type Radacct = typeof radacct.$inferSelect;
