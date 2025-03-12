import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './drizzle';

export const applyMigrations = async () => {
	await migrate(db, { migrationsFolder: './drizzle' });
};
