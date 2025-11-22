import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { nas } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	const [nasItem] = await db.select().from(nas).where(eq(nas.id, id));
	if (!nasItem) throw redirect(302, '/nas');

	return { nas: nasItem };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = Number(params.id);
		const formData = await request.formData();

		const nasname = formData.get('nasname') as string;
		const shortname = formData.get('shortname') as string;
		const type = formData.get('type') as string;
		const ports = Number(formData.get('ports'));
		const secret = formData.get('secret') as string;
		const server = formData.get('server') as string;
		const community = formData.get('community') as string;
		const description = formData.get('description') as string;
		const require_ma = formData.get('require_ma') as string;
		const limit_proxy_state = formData.get('limit_proxy_state') as string;

		if (!nasname || !secret) return fail(400, { message: 'Name und Secret müssen gesetzt sein' });

		try {
			await db
				.update(nas)
				.set({
					nasname,
					shortname,
					type,
					ports,
					secret,
					server,
					community,
					description,
					require_ma,
					limit_proxy_state
				})
				.where(eq(nas.id, id));
		} catch {
			return fail(500, { message: 'Update fehlgeschlagen' });
		}

		throw redirect(302, resolve('/radreply'));
	},
	delete: async ({ params }) => {
		const id = Number(params.id);

		try {
			await db.delete(nas).where(eq(nas.id, id));
		} catch {
			return fail(500, { message: 'Löschen fehlgeschlagen' });
		}

		throw redirect(302, resolve('/nas'));
	}
};
