import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { user as users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;

	if (!id) {
		throw redirect(303, resolve('/admins'));
	}

	const user = (await db.select().from(users).where(eq(users.id, id)))[0];

	if (!user.id) {
		throw redirect(303, resolve('/admins'));
	}

	return {
		user
	};
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = params.id;
		const formData = await request.formData();

		const password = formData.get('password') as string;

		if (!id) return { error: 'Kein Benutzer angegeben' };

		// Passwort updaten
		if (password) {
			const hashed = await hash(password, {
				memoryCost: 19456,
				timeCost: 3,
				outputLen: 32,
				parallelism: 1
			});

			await db.update(users).set({ passwordHash: hashed }).where(eq(users.id, id));
		}

		return { success: true };
	},

	delete: async ({ params }) => {
		const id = params.id;
		if (!id) return { error: 'Kein Benutzer angegeben' };

		await db.delete(users).where(eq(users.id, id));

		throw redirect(303, resolve('/admins'));
	}
};
