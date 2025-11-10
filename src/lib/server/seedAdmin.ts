// src/server/seedAdmin.ts
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import { user } from './db/schema';

async function seedAdmin() {
	// Prüfen, ob schon ein User existiert
	const existing = await db.select().from(user).limit(1);

	if (existing.length === 0) {
		const userIdBytes = crypto.getRandomValues(new Uint8Array(15));
		const userId = encodeBase32LowerCase(userIdBytes);

		const passwordHash = await hash('adminadmin', {
			memoryCost: 19456,
			timeCost: 3,
			outputLen: 32,
			parallelism: 1
		});

		await db.insert(user).values({
			id: userId,
			username: 'admin',
			passwordHash
		});

		console.info('Erster Admin-User angelegt: admin/admin');
	} else {
		console.debug('Admin-User existiert bereits.');
	}
}

// Beim Import sofort ausführen
seedAdmin().catch((err) => console.error('Fehler beim Anlegen des Admins:', err));
