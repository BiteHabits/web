import { describe, expect, it } from 'vitest';
import { givenUser } from './fixtures/users';
import { givenSession } from './fixtures/sessions';
import { getValidSessionAndUser } from '$lib/services/session.service';
import { subDays } from 'date-fns';

describe('SessionService', () => {
	it('should return a valid session', async () => {
		await givenUser({ id: 'user-1' });
		await givenSession({ id: 'session-1', userId: 'user-1' });

		const session = await getValidSessionAndUser('session-1');

		expect(session).not.toBeNull();
		expect(session?.user.id).toBe('user-1');
		expect(session?.session.id).toBe('session-1');
	});

	it('should not return a valid session', async () => {
		await givenUser({ id: 'user-1' });
		await givenSession({ id: 'session-1', userId: 'user-1', expiresAt: subDays(new Date(), 3) });

		const session = await getValidSessionAndUser('session-1');

		expect(session).toBeNull();
	});
});
