import { db } from '$lib/server/db';
import { radacct } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { count, desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 20);
	const offset = (page - 1) * limit;

	const usernameFilter = url.searchParams.get('username') ?? '';

	const logs = await db
		.select()
		.from(radacct)
		.where(usernameFilter ? eq(radacct.username, usernameFilter) : undefined)
		.orderBy(desc(radacct.acctstarttime))
		.limit(limit)
		.offset(offset);

	// Optional: Gesamtanzahl für Pagination
	const totalCountResult = await db
		.select({ count: count(radacct.username) })
		.from(radacct)
		.where(usernameFilter ? eq(radacct.username, usernameFilter) : undefined);

	const totalCount = totalCountResult[0]?.count ?? 0;

	return {
		logs,
		page,
		limit,
		totalCount,
		totalPages: Math.ceil(totalCount / limit),
		usernameFilter
	};
};
