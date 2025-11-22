import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { radreply } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const replyList = await db.select().from(radreply);
	return { replyList };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) return fail(400, { message: 'Ungültige ID' });

		try {
			await db.delete(radreply).where(eq(radreply.id, id));
		} catch {
			return fail(500, { message: 'Eintrag konnte nicht gelöscht werden' });
		}

		return { success: true };
	}
};
