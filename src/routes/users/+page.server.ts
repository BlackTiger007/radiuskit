import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { radcheck, radreply, radusergroup } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	// Alle relevanten RADIUS-Daten holen
	const [checks, replies, groups] = await Promise.all([
		db.select().from(radcheck).orderBy(asc(radcheck.username)),
		db.select().from(radreply).orderBy(asc(radreply.username)),
		db.select().from(radusergroup).orderBy(asc(radusergroup.username))
	]);

	// Benutzerdaten zusammenfassen
	const usersMap = new Map<
		string,
		{
			UserName: string;
			password?: string;
			loginTime?: string;
			groups: string[];
			replies: { Attribute: string; Value: string }[];
		}
	>();

	for (const entry of checks) {
		const user = usersMap.get(entry.username) || {
			UserName: entry.username,
			groups: [],
			replies: []
		};
		if (entry.attribute === 'Cleartext-Password') user.password = entry.value;
		if (entry.attribute === 'Login-Time') user.loginTime = entry.value;
		usersMap.set(entry.username, user);
	}

	for (const entry of replies) {
		const user = usersMap.get(entry.username) || {
			UserName: entry.username,
			groups: [],
			replies: []
		};
		user.replies.push({ Attribute: entry.attribute, Value: entry.value });
		usersMap.set(entry.username, user);
	}

	for (const entry of groups) {
		const user = usersMap.get(entry.username) || {
			UserName: entry.username,
			groups: [],
			replies: []
		};
		user.groups.push(entry.groupname);
		usersMap.set(entry.username, user);
	}

	return { users: Array.from(usersMap.values()) };
};
