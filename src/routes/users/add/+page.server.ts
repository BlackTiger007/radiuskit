import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { radcheck, radusergroup } from '$lib/server/db/schema';
import { resolve } from '$app/paths';
import { hash } from '@node-rs/argon2';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const username = ((form.get('username') as string) || '').trim();
		const password = (form.get('password') as string) || '';
		const hashMethod = ((form.get('hash_method') as string) || 'MD5').trim();
		const group = ((form.get('group') as string) || '').trim() || null;
		const loginTime = ((form.get('login_time') as string) || '').trim() || null;
		const priority = parseInt((form.get('priority') as string) || '1', 10);

		if (!username || !password) {
			return fail(400, { message: 'Benutzername und Passwort sind erforderlich.' });
		}
		if (password.length < 6) {
			return fail(400, { message: 'Passwort zu kurz (min. 6 Zeichen).' });
		}

		// Passwort je nach Auswahl hashen
		let valueToStore: string;
		let attribute: string;

		if (hashMethod === 'MD5') {
			const hashed = await hash(password, {
				memoryCost: 19456,
				timeCost: 3,
				outputLen: 32,
				parallelism: 1
			});
			valueToStore = hashed;
			attribute = 'MD5-Password';
		} else {
			valueToStore = password;
			attribute = 'Cleartext-Password';
		}

		try {
			// Passwort in radcheck eintragen
			await db.insert(radcheck).values({
				username: username,
				attribute: attribute,
				op: ':=',
				value: valueToStore
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
