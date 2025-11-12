import { resolve } from '$app/paths';
import { deleteSessionTokenCookie } from '$lib/server/auth';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	// Session-Cookie löschen
	deleteSessionTokenCookie(event);

	// Locals leeren
	event.locals.user = null;
	event.locals.session = null;

	// Weiterleitung zum Login
	throw redirect(302, resolve('/login'));
};
