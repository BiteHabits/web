import { nanoid } from 'nanoid';
import { getDb } from '../utils/get-db';
import { users, UserInsert } from '../../src/lib/db/schemas';
import { faker } from '@faker-js/faker';

export const givenUser = async (user?: Partial<UserInsert>) => {
	const db = getDb();

	const userInsert = {
		id: user?.id ?? nanoid(),
		name: user?.name ?? faker.person.firstName(),
		email: user?.email ?? faker.internet.email()
	};

	await db.insert(users).values(userInsert);

	return userInsert;
};
