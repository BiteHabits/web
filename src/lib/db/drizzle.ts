import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from './schemas';

const AUTH_TOKEN = env.DATABASE_AUTH_TOKEN || undefined;

export const client = createClient({ url: env.DATABASE_URL, authToken: AUTH_TOKEN });

export const db = drizzle(client, {
	schema,
	casing: 'snake_case'
});
