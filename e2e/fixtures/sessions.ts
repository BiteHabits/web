import { addDays } from 'date-fns';
import { nanoid } from 'nanoid';
import { getDb } from '../utils/get-db';
import { sessions, SessionInsert } from '../../src/lib/db/schemas';

export const givenSession = async (session?: Partial<SessionInsert>) => {
	const db = getDb();

	const sessionInsert = {
		id: session?.id ?? nanoid(),
		expiresAt: session?.expiresAt ?? addDays(new Date(), 7),
		userId: session?.userId ?? nanoid(),
		createdAt: session?.createdAt ?? new Date()
	};

	await db.insert(sessions).values(sessionInsert);

	return sessionInsert;
};
