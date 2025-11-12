import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { nas } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const nasList = await db.select().from(nas);
	return { nasList };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		if (!id) return fail(400, { message: 'Ungültige NAS-ID' });

		try {
			await db.delete(nas).where(eq(nas.id, id));
		} catch {
			return fail(500, { message: 'NAS konnte nicht gelöscht werden' });
		}

		return { success: true };
	}
};
