import { defineConfig } from 'drizzle-kit';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const turso = defineConfig({
	schema: './src/lib/db/schemas/index.ts',
	casing: 'snake_case',
	dialect: 'turso',
	verbose: true,
	strict: true,

	dbCredentials: {
		url: DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN || undefined
	}
});

const sqlite = defineConfig({
	schema: './src/lib/db/schemas/index.ts',
	casing: 'snake_case',
	dialect: 'sqlite',
	verbose: true,
	strict: true,

	dbCredentials: {
		url: DATABASE_URL
	}
});

const isDEV = DATABASE_URL.startsWith('file:');

export default isDEV ? sqlite : turso;
