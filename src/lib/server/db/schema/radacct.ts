import { mysqlTable, bigint, int, varchar, datetime, index } from 'drizzle-orm/mysql-core';

export const radacct = mysqlTable(
	'radacct',
	{
		radacctid: bigint({ mode: 'bigint' }).notNull().primaryKey().autoincrement(),
		acctsessionid: varchar({ length: 64 }).notNull().default(''),
		acctuniqueid: varchar({ length: 32 }).notNull().unique().default(''),
		username: varchar({ length: 64 }).notNull().default(''),
		groupname: varchar({ length: 64 }).notNull().default(''),
		realm: varchar({ length: 64 }).default(''),
		nasipaddress: varchar({ length: 15 }).notNull().default(''),
		nasportid: varchar({ length: 32 }),
		nasporttype: varchar({ length: 32 }),
		acctstarttime: datetime().notNull().default(new Date('0')),
		acctupdatetime: datetime().notNull().default(new Date('0')),
		acctstoptime: datetime().notNull().default(new Date('0')),
		acctinterval: int(),
		acctsessiontime: int({ unsigned: true }),
		acctauthentic: varchar({ length: 32 }),
		connectinfo_start: varchar({ length: 50 }),
		connectinfo_stop: varchar({ length: 50 }),
		acctinputoctets: bigint({ mode: 'bigint' }),
		acctoutputoctets: bigint({ mode: 'bigint' }),
		calledstationid: varchar({ length: 50 }).notNull().default(''),
		callingstationid: varchar({ length: 50 }).notNull().default(''),
		acctterminatecause: varchar({ length: 32 }).notNull().default(''),
		servicetype: varchar({ length: 32 }),
		framedprotocol: varchar({ length: 32 }),
		framedipaddress: varchar({ length: 15 }).notNull().default(''),
		framedipv6address: varchar({ length: 45 }).notNull().default(''),
		framedipv6prefix: varchar({ length: 45 }).notNull().default(''),
		framedinterfaceid: varchar({ length: 44 }).notNull().default(''),
		delegatedipv6prefix: varchar({ length: 45 }).notNull().default(''),
		class: varchar({ length: 64 })
	},
	(table) => [
		index('username_idx').on(table.username),
		index('framedipaddress_idx').on(table.framedipaddress),
		index('framedipv6address_idx').on(table.framedipv6address),
		index('framedipv6prefix_idx').on(table.framedipv6prefix),
		index('framedinterfaceid_idx').on(table.framedinterfaceid),
		index('delegatedipv6prefix_idx').on(table.delegatedipv6prefix),
		index('acctsessionid_idx').on(table.acctsessionid),
		index('acctsessiontime_idx').on(table.acctsessiontime),
		index('acctstarttime_idx').on(table.acctstarttime),
		index('acctinterval_idx').on(table.acctinterval),
		index('acctstoptime_idx').on(table.acctstoptime),
		index('nasipaddress_idx').on(table.nasipaddress),
		index('bulk_close_idx').on(table.acctstoptime, table.nasipaddress, table.acctstarttime)
	]
);

export type Radacct = typeof radacct.$inferSelect;
