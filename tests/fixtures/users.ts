import { db } from '$lib/db/drizzle';
import { users, type UserInsert } from '$lib/db/schemas';
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';

export const givenUser = async (user?: Partial<UserInsert>) => {
	const userInsert = {
		id: user?.id ?? nanoid(),
		name: user?.name ?? faker.person.firstName(),
		email: user?.email ?? faker.internet.email()
	};

	await db.insert(users).values(userInsert);

	return userInsert;
};
