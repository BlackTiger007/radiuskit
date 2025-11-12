import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { nas } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			nasname: formData.get('nasname') as string,
			shortname: formData.get('shortname') as string,
			type: (formData.get('type') as string) || 'other',
			ports: formData.get('ports') ? Number(formData.get('ports')) : null,
			secret: (formData.get('secret') as string) || 'secret',
			server: formData.get('server') as string,
			community: formData.get('community') as string,
			description: (formData.get('description') as string) || 'RADIUS Client',
			require_ma: (formData.get('require_ma') as string) || 'auto',
			limit_proxy_state: (formData.get('limit_proxy_state') as string) || 'auto'
		};

		// Validierung minimal
		if (!data.nasname) {
			return { status: 400, errors: { nasname: 'NAS Name wird benötigt' } };
		}

		try {
			await db.insert(nas).values(data);
		} catch (err) {
			console.error('Fehler beim Einfügen des NAS:', err);
			return { status: 500, errors: { message: 'Fehler beim Erstellen des NAS' } };
		}

		throw redirect(302, resolve('/nas'));
	}
};
