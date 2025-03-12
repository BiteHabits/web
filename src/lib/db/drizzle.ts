import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from './schemas';

export const client = createClient({ url: env.DATABASE_URL });

export const db = drizzle(client, {
	schema,
	casing: 'snake_case'
});
