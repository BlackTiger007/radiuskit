import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { resolve } from '$app/paths';

export const load = (async ({ url, locals }) => {
	if (url.pathname.endsWith('/login')) return;
	if (!locals.user || !locals.session) redirect(302, resolve('/login'));

	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
