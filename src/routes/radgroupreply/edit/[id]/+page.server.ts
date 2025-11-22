import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { radgroupreply } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { RadiusOperator } from '$lib/types/operator';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	const [item] = await db.select().from(radgroupreply).where(eq(radgroupreply.id, id));
	if (!item) throw redirect(302, '/radgroupreply');

	return { item };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = Number(params.id);
		const formData = await request.formData();

		const groupname = formData.get('groupname') as string;
		const attribute = formData.get('attribute') as string;
		const op = (formData.get('op') as RadiusOperator) || ':=';
		const value = formData.get('value') as string;

		if (!groupname || !attribute || !value) {
			return fail(400, { message: 'Pflichtfelder fehlen' });
		}

		try {
			await db
				.update(radgroupreply)
				.set({ groupname, attribute, op, value })
				.where(eq(radgroupreply.id, id));
		} catch {
			return fail(500, { message: 'Update fehlgeschlagen' });
		}

		throw redirect(302, resolve('/radgroupreply'));
	},
	delete: async ({ params }) => {
		const id = Number(params.id);

		try {
			await db.delete(radgroupreply).where(eq(radgroupreply.id, id));
		} catch {
			return fail(500, { message: 'Löschen fehlgeschlagen' });
		}

		throw redirect(302, resolve('/radgroupreply'));
	}
};
