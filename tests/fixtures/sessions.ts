import { db } from '$lib/db/drizzle';
import { sessions, type SessionInsert } from '$lib/db/schemas';
import { addDays } from 'date-fns';
import { nanoid } from 'nanoid';

export const givenSession = async (session?: Partial<SessionInsert>) => {
	const sessionInsert = {
		id: session?.id ?? nanoid(),
		expiresAt: session?.expiresAt ?? addDays(new Date(), 7),
		userId: session?.userId ?? nanoid(),
		createdAt: session?.createdAt ?? new Date()
	};

	await db.insert(sessions).values(sessionInsert);

	return sessionInsert;
};
