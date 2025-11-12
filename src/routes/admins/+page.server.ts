import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const users = await db.select().from(user).orderBy(asc(user.id));

	return { users: users.map((u) => ({ id: u.id, username: u.username })) };
};
