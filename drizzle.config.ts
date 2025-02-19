import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/db/schemas/index.ts',

	dbCredentials: {
		url: process.env.DATABASE_URL
	},

	casing: 'snake_case',
	dialect: 'sqlite',
	verbose: true,
	strict: true
});
