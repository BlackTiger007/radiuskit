import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { radreply } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { RadiusOperator } from '$lib/types/operator';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);

	const [item] = await db.select().from(radreply).where(eq(radreply.id, id));

	if (!item) {
		throw redirect(302, '/radreply');
	}

	return { entry: item };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = Number(params.id);
		const form = await request.formData();

		const username = form.get('username') as string;
		const attribute = form.get('attribute') as string;
		const op = form.get('op') as RadiusOperator;
		const value = form.get('value') as string;

		if (!username || !attribute || !value) {
			return fail(400, { message: 'Pflichtfelder fehlen' });
		}

		try {
			await db
				.update(radreply)
				.set({
					username,
					attribute,
					op,
					value
				})
				.where(eq(radreply.id, id));
		} catch {
			return fail(500, { message: 'Update fehlgeschlagen' });
		}

		throw redirect(302, resolve('/radreply'));
	},

	delete: async ({ params }) => {
		const id = Number(params.id);

		try {
			await db.delete(radreply).where(eq(radreply.id, id));
		} catch {
			return fail(500, { message: 'Löschen fehlgeschlagen' });
		}

		throw redirect(302, resolve('/radreply'));
	}
};
