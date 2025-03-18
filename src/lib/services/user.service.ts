import { db } from '$lib/db/drizzle';
import { users, type UserInsert } from '$lib/db/schemas';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const getUserById = async (userId: string | undefined) => {
	if (!userId) {
		return null;
	}

	const user = await db.query.users.findFirst({
		where: (row, { eq }) => eq(row.id, userId)
	});

	if (!user) {
		return null;
	}

	return user;
};

export const deleteUser = async (userId: string) => {
	const deletedUser = await db.delete(users).where(eq(users.id, userId));
	return deletedUser;
};

export const updateUser = async (userId: string, user: UserInsert) => {
	if (!user) {
		return null;
	}

	const updatedUser = await db
		.update(users)
		.set({
			name: user.name,
			email: user.email
		})
		.where(eq(users.id, userId))
		.returning();

	return updatedUser;
};

export const createUser = async (user: UserInsert) => {
	if (!user) {
		return null;
	}

	const newUser = await db
		.insert(users)
		.values({
			id: user.id ?? nanoid(),
			name: user.name,
			email: user.email
		})
		.returning();

	return newUser[0];
};
