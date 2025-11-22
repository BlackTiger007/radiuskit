import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { radreply, type RadReplyInsert } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { RadiusOperator } from '$lib/types/operator';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const data: RadReplyInsert = {
			username: form.get('username') as string,
			attribute: form.get('attribute') as string,
			op: (form.get('op') as RadiusOperator) || ':=',
			value: form.get('value') as string
		};

		// Minimalvalidierung
		if (!data.username) {
			return { status: 400, errors: { username: 'Benutzername wird benötigt' } };
		}
		if (!data.attribute) {
			return { status: 400, errors: { attribute: 'Attribut wird benötigt' } };
		}
		if (!data.value) {
			return { status: 400, errors: { value: 'Wert wird benötigt' } };
		}

		try {
			await db.insert(radreply).values(data);
		} catch (err) {
			console.error('Fehler beim Einfügen des radreply-Eintrags:', err);
			return { status: 500, errors: { message: 'Fehler beim Erstellen des Eintrags' } };
		}

		throw redirect(302, resolve('/radreply'));
	}
};
