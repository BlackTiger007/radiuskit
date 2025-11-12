import { db } from '$lib/server/db';
import { radgroupcheck } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { resolve } from '$app/paths';

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await request.formData();

		const groupname = form.get('GroupName') as string;
		const attribute = form.get('Attribute') as string;
		const op = form.get('op') as string;
		const value = form.get('Value') as string;

		if (!groupname || !attribute || !op || !value) {
			return { success: false, error: 'Alle Felder sind erforderlich' };
		}

		await db.insert(radgroupcheck).values({
			groupname,
			attribute,
			op,
			value
		});

		throw redirect(303, resolve('/group'));
	}
};
