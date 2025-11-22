import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { radgroupreply } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const groupList = await db.select().from(radgroupreply);
	return { groupList };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		if (!id) return fail(400, { message: 'Ungültige ID' });

		try {
			await db.delete(radgroupreply).where(eq(radgroupreply.id, id));
		} catch {
			return fail(500, { message: 'Eintrag konnte nicht gelöscht werden' });
		}

		return { success: true };
	}
};
