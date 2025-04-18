import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/db/schemas/index.ts',
	casing: 'snake_case',
	dialect: 'turso',
	verbose: true,
	strict: true,

	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN || undefined
	}
});
