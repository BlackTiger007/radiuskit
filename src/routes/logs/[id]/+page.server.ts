import { db } from '$lib/server/db';
import { radpostauth } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	const log = await db.select().from(radpostauth).where(eq(radpostauth.id, id));

	if (!log) {
		throw fail(404, { message: 'Log not found' });
	}

	if (log.length > 1) {
		throw fail(500, { message: 'Multiple logs found with the same ID' });
	}

	return { log: log[0] };
};
