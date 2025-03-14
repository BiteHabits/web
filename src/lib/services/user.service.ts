import { db } from '$lib/db/drizzle';

export const getUserNameAndEmail = async (userId: string) => {
	const user = await db.query.users.findFirst({
		where: (row, { eq }) => eq(row.id, userId)
	});

	if (!user) {
		return null;
	}

	return {
		name: user.name,
		email: user.email
	};
};

export const findUserByEmail = async (email: string) => {
	const user = await db.query.users.findFirst({
		where: (row, { eq }) => eq(row.email, email)
	});

	if (!user) {
		return null;
	}

	return {
		user
	};
};

export const getUserAndFridges = async (userId: string) => {
	const user = await db.query.users.findFirst({
		where: (row, { eq }) => eq(row.id, userId)
	});

	const fridges = await db.query.fridges.findMany({
		where: (row, { eq }) => eq(row.userId, userId)
	});

	if (!user || !fridges) {
		return null;
	}

	return {
		user,
		fridges
	};
};
