import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { radgroupreply, type RadGroupReplyInsert } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { RadiusOperator } from '$lib/types/operator';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data: RadGroupReplyInsert = {
			groupname: formData.get('groupname') as string,
			attribute: formData.get('attribute') as string,
			op: (formData.get('op') as RadiusOperator) || ':=',
			value: formData.get('value') as string
		};

		if (!data.groupname || !data.attribute || !data.value) {
			return { status: 400, errors: { message: 'Pflichtfelder fehlen' } };
		}

		try {
			await db.insert(radgroupreply).values(data);
		} catch (err) {
			console.error('Fehler beim Einfügen des radgroupreply-Eintrags:', err);
			return { status: 500, errors: { message: 'Fehler beim Erstellen des Eintrags' } };
		}

		throw redirect(302, resolve('/radgroupreply'));
	}
};
