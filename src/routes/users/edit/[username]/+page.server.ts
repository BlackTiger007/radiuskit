import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { radcheck, radreply, radusergroup } from '$lib/server/db/schema';
import { and, eq, or } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.username;

	if (!username) {
		throw redirect(303, resolve('/users'));
	}

	const checks = await db.select().from(radcheck).where(eq(radcheck.username, username));
	const replies = await db.select().from(radreply).where(eq(radreply.username, username));
	const groups = await db.select().from(radusergroup).where(eq(radusergroup.username, username));

	const user = {
		username,
		password: checks.find((c) => c.attribute === 'Cleartext-Password')?.value ?? '',
		loginTime: checks.find((c) => c.attribute === 'Login-Time')?.value ?? '',
		groups: groups.map((g) => g.groupname),
		replies: replies.map((r) => ({ attribute: r.attribute, value: r.value }))
	};

	if (!(checks.find((c) => c.attribute.includes('Password'))?.value ?? '')) {
		throw redirect(303, resolve('/users'));
	}

	return {
		user
	};
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const username = params.username;
		const formData = await request.formData();

		const password = formData.get('password') as string;
		const hashMethod = (formData.get('hash_method') as string) || 'MD5';
		const groupString = formData.get('groups') as string;
		const repliesRaw = formData.get('replies') as string;

		if (!username) return { error: 'Kein Benutzer angegeben' };

		// Passwort updaten
		if (password) {
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

			// Vorhandenes Passwort-Attribut löschen
			await db
				.delete(radcheck)
				.where(
					and(
						eq(radcheck.username, username),
						or(eq(radcheck.attribute, 'Cleartext-Password'), eq(radcheck.attribute, 'MD5-Password'))
					)
				);

			// Neues Passwort einfügen
			await db.insert(radcheck).values({
				username: username,
				attribute: attribute,
				op: ':=',
				value: valueToStore
			});
		}

		// Gruppen aktualisieren
		const groups = groupString
			.split(',')
			.map((g) => g.trim())
			.filter(Boolean);

		await db.delete(radusergroup).where(eq(radusergroup.username, username));
		for (const g of groups) {
			await db.insert(radusergroup).values({ username: username, groupname: g, priority: 1 });
		}

		// Replies aktualisieren
		const replies = JSON.parse(repliesRaw ?? '[]') as { attribute: string; value: string }[];
		await db.delete(radreply).where(eq(radreply.username, username));
		for (const r of replies) {
			await db.insert(radreply).values({
				username: username,
				attribute: r.attribute,
				op: ':=',
				value: r.value
			});
		}

		return { success: true };
	},

	delete: async ({ params }) => {
		const username = params.username;
		if (!username) return { error: 'Kein Benutzer angegeben' };

		await db.delete(radcheck).where(eq(radcheck.username, username));
		await db.delete(radusergroup).where(eq(radusergroup.username, username));
		await db.delete(radreply).where(eq(radreply.username, username));

		throw redirect(303, resolve('/users'));
	}
};
