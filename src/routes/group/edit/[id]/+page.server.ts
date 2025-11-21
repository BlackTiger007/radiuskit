import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { radgroupcheck } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { resolve } from '$app/paths';
import { RADIUS_OPERATORS, type RadiusOperator } from '$lib/types/operator';
import {
	RADGROUPCHECK_ATTRIBUTES,
	type RadGroupCheckAttribute
} from '$lib/types/attribute/radgroupcheck';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);

	const group = await db.select().from(radgroupcheck).where(eq(radgroupcheck.id, id));

	if (!group) throw fail(404, { error: 'Gruppe nicht gefunden' });

	if (group.length > 1) throw fail(500, { error: 'Mehrere Gruppen mit derselben ID gefunden' });

	return { group: group[0] };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const form = await request.formData();
		const id = Number(params.id);

		const groupname = form.get('GroupName') as string;
		const attribute = form.get('Attribute') as RadGroupCheckAttribute;
		const op = form.get('op') as RadiusOperator;
		const value = form.get('Value') as string;

		if (!groupname || !attribute || !op || !value) {
			return fail(400, { error: 'Alle Felder sind erforderlich' });
		}

		if (!RADGROUPCHECK_ATTRIBUTES.includes(attribute)) {
			return fail(400, { error: 'Ungültiges Attribut' });
		}

		if (!RADIUS_OPERATORS.includes(op)) {
			return fail(400, { error: 'Ungültiger Operator' });
		}

		await db
			.update(radgroupcheck)
			.set({ groupname, attribute, op, value })
			.where(eq(radgroupcheck.id, id));

		throw redirect(302, resolve('/group'));
	},

	delete: async ({ params }) => {
		const id = Number(params.id);

		await db.delete(radgroupcheck).where(eq(radgroupcheck.id, id));

		throw redirect(302, resolve('/group'));
	}
};
