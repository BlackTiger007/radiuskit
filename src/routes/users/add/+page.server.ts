import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { radcheck, radusergroup } from '$lib/server/db/schema';
import { resolve } from '$app/paths';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const username = ((form.get('username') as string) || '').trim();
		const password = (form.get('password') as string) || '';
		const group = ((form.get('group') as string) || '').trim() || null;
		const loginTime = ((form.get('login_time') as string) || '').trim() || null;
		const priority = parseInt((form.get('priority') as string) || '1', 10);

		if (!username || !password) {
			return fail(400, { message: 'Benutzername und Passwort sind erforderlich.' });
		}
		if (password.length < 6) {
			return fail(400, { message: 'Passwort zu kurz (min. 6 Zeichen).' });
		}

		try {
			// Insert Cleartext-Password into radcheck
			await db.insert(radcheck).values({
				username: username,
				attribute: 'Cleartext-Password',
				op: ':=',
				value: password
			});

			if (loginTime) {
				await db.insert(radcheck).values({
					username: username,
					attribute: 'Login-Time',
					op: ':=',
					value: loginTime
				});
			}

			if (group) {
				await db.insert(radusergroup).values({
					username: username,
					groupname: group,
					priority: priority
				});
			}
		} catch (err) {
			console.error('Fehler beim Anlegen des RADIUS Users:', err);
			return fail(500, { message: 'Fehler beim Anlegen des Benutzers.' });
		}

		// Erfolgreich — weiterleiten zur Liste
		throw redirect(303, resolve('/users'));
	}
};
