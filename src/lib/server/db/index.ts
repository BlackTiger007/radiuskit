import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Pflichtvariablen prüfen
if (!env.DB_HOST || !env.DB_PORT || !env.DB_USER || !env.DB_PASSWORD || !env.DB_NAME) {
	throw new Error(
		'Es müssen alle Parameter gesetzt sein: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME'
	);
}

// Pool erstellen
const client = mysql.createPool({
	host: env.DB_HOST,
	port: Number(env.DB_PORT),
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,

	// optionale Werte aus ENV
	waitForConnections: true,
	connectionLimit: env.DB_POOL_SIZE ? Number(env.DB_POOL_SIZE) : 10,
	queueLimit: 0,

	// sinnvolle Defaults, individuell anpassbar
	decimalNumbers: true,
	supportBigNumbers: true,
	bigNumberStrings: false,
	timezone: env.DB_TIMEZONE ?? 'Z'
});

// Drizzle Client
export const db = drizzle(client, {
	schema,
	mode: 'default'
});
