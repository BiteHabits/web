import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../../src/lib/db/schemas';

export const getDb = () => {
	return drizzle(createClient({ url: process.env.DATABASE_URL! }), {
		schema,
		casing: 'snake_case'
	});
};
