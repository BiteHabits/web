import { givenUser } from './fixtures/users';
import { describe, expect, it } from 'vitest';
import { UserService } from '$lib/services';

describe('UserService', () => {
	it('should return a user', async () => {
		await givenUser({ id: 'user-1', name: 'user1', email: 'user1@email.com' });

		const user = await getUserById('user-1');

		expect(user).not.toBe(null);
		expect(user?.id).toBe('user-1');
		expect(user?.name).toBe('user1');
		expect(user?.email).toBe('user1@email.com');
	});

	it('should create a user', async () => {
		const createdUser = await createUser({
			id: '0',
			name: 'user1',
			email: 'user1@email.com'
		});

		expect(createdUser).not.toBeNull();
		expect(createdUser?.name).toBe('user1');
		expect(createdUser?.email).toBe('user1@email.com');

		const foundUser = await getUserById(createdUser?.id);

		expect(foundUser).not.toBeNull();
		expect(foundUser?.name).toBe('user1');
		expect(foundUser?.email).toBe('user1@email.com');
	});

	it('should update a user', async () => {
		await givenUser({ id: 'user-1', name: 'user1', email: 'user1@email.com' });

		const updatedUser = await updateUser('user-1', {
			name: 'newuser1',
			email: 'newuser1@email.com'
		});

		expect(updatedUser).not.toBeNull();

		const foundUser = await getUserById('user-1');

		expect(foundUser).not.toBeNull();
		expect(foundUser?.name).toBe('newuser1');
		expect(foundUser?.email).toBe('newuser1@email.com');
	});

	it('should delete a user', async () => {
		await givenUser({ id: 'user-1', name: 'user1', email: 'user1@email.com' });

		const deletedUser = await deleteUser('user-1');

		expect(deletedUser).not.toBeNull();

		const userAfterDeletion = await getUserById('user-1');

		expect(userAfterDeletion).toBeNull();
	});
});
