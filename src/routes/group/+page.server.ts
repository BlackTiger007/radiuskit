import { db } from '$lib/server/db';
import { radgroupcheck } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groups = await db.select().from(radgroupcheck).orderBy(radgroupcheck.groupname);

	return { groups };
};
