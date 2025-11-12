import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user as users } from '$lib/server/db/schema';
import { resolve } from '$app/paths';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const username = ((form.get('username') as string) || '').trim();
		const password = (form.get('password') as string) || '';

		if (!username || !password) {
			return fail(400, { message: 'Benutzername und Passwort sind erforderlich.' });
		}
		if (password.length < 6) {
			return fail(400, { message: 'Passwort zu kurz (min. 6 Zeichen).' });
		}

		const userIdBytes = crypto.getRandomValues(new Uint8Array(15));
		const userId = encodeBase32LowerCase(userIdBytes);

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 3,
			outputLen: 32,
			parallelism: 1
		});

		try {
			// Insert Cleartext-Password into radcheck
			await db.insert(users).values({
				id: userId,
				passwordHash: passwordHash,
				username: username
			});
		} catch (err) {
			console.error('Fehler beim Anlegen des Admins Users:', err);
			return fail(500, { message: 'Fehler beim Anlegen des Benutzers.' });
		}

		// Erfolgreich — weiterleiten zur Liste
		throw redirect(303, resolve('/admins'));
	}
};
