import { defineConfig } from 'drizzle-kit';

// Pflichtvariablen prüfen
if (
	!process.env.DB_HOST ||
	!process.env.DB_PORT ||
	!process.env.DB_USER ||
	!process.env.DB_PASSWORD ||
	!process.env.DB_NAME
) {
	throw new Error('Required parameters not set: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME');
}

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'mysql',
	dbCredentials: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		ssl: {
			pfx: process.env.DB_SSL_PFX,
			key: process.env.DB_SSL_KEY,
			passphrase: process.env.DB_SSL_PASSPHRASE,
			cert: process.env.DB_SSL_CERT,
			ca: process.env.DB_SSL_CA,
			crl: process.env.DB_SSL_CRL,
			ciphers: process.env.DB_SSL_CIPHERS,
			rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
		}
	},
	verbose: true,
	strict: true
});
