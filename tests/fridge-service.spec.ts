import { describe, expect, it } from 'vitest';
import { givenFridge } from './fixtures/fridges';
import { givenUser } from './fixtures/users';
import {
	addMemberToFridge,
	createFridge,
	deleteFridge,
	getFridgeById,
	updateFridge
} from '$lib/services/fridge.service';

describe('FridgeService', () => {
	it('should return a fridge', async () => {
		const user = await givenUser({ id: 'user-1' });
		await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });

		const fridge = await getFridgeById('Fridge-1', user.id);

		expect(fridge).not.toBe(null);
		expect(fridge?.id).toBe('Fridge-1');
		expect(fridge?.name).toBe('TestFridge');
		expect(fridge?.creator).toBe(user.id);
	});

	it('should return a fridge when a member retrieves it', async () => {
		const user = await givenUser({ id: 'user-1' });
		const user2 = await givenUser({ id: 'user-2' });
		await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });
		await addMemberToFridge('Fridge-1', user.id, [user2.id]);

		const fridge = await getFridgeById('Fridge-1', user2.id);
		expect(fridge).not.toBe(null);
		expect(fridge?.id).toBe('Fridge-1');
		expect(fridge?.name).toBe('TestFridge');
		expect(fridge?.creator).toBe(user.id);
	});

	it('should throw an error when a non member tries to retrieve a fridge', async () => {
		const createdUser = await givenUser({ id: 'user-1' });
		const createdUser2 = await givenUser({ id: 'user-2' });
		await givenFridge(createdUser, { id: 'Fridge-1' });
		await expect(getFridgeById('Fridge-1', createdUser2.id)).rejects.toThrow();
	});

	it('should create a fridge', async () => {
		const createdUser = await givenUser({ id: 'user-1' });

		const createdFridge = await createFridge('Fridge-1', createdUser.id);

		expect(createdFridge).not.toBeNull();
		expect(createdFridge?.userId).toBe(createdUser.id);
		expect(createdFridge?.name).toBe('Fridge-1');

		const foundFridge = await getFridgeById(createdFridge?.id ?? 'Feil', createdUser.id);

		expect(foundFridge).not.toBeNull();
		expect(foundFridge?.creator).toBe(createdUser.id);
		expect(foundFridge?.name).toBe('Fridge-1');
	});

	it('should update the name of the fridge', async () => {
		const createdUser = await givenUser({ id: 'user-1' });

		await givenFridge(createdUser, { id: 'Fridge-1' });

		const updatedFridge = await updateFridge('Fridge-1', 'new-name', createdUser.id);

		expect(updatedFridge).not.toBeNull();

		const foundFridge = await getFridgeById('Fridge-1', createdUser.id);

		expect(foundFridge).not.toBeNull();
		expect(foundFridge?.name).toBe('new-name');
		expect(foundFridge?.creator).toBe(createdUser.id);
	});

	it('should throw an error when a non creator tries to update a fridge', async () => {
		const createdUser = await givenUser({ id: 'user-1' });
		const createdUser2 = await givenUser({ id: 'user-2' });

		await givenFridge(createdUser, { id: 'Fridge-1' });
		await addMemberToFridge('Fridge-1', createdUser.id, [createdUser2.id]);

		await expect(updateFridge('Fridge-1', 'new-name', createdUser2.id)).rejects.toThrow();
	});

	it('should delete a fridge when given id and correct creator id', async () => {
		const createdUser = await givenUser({ id: 'user-1' });

		const fridge = await givenFridge(createdUser, { id: 'Fridge-1' });

		const deletedFridge = await deleteFridge(fridge.id, createdUser.id);

		expect(deletedFridge).not.toBeNull();

		expect(getFridgeById('Fridge-1', createdUser.id)).rejects.toThrow();
	});

	it('should throw an error when a non creator tries to delete a fridge', async () => {
		const createdUser = await givenUser({ id: 'user-1' });
		const createdUser2 = await givenUser({ id: 'user-2' });

		const fridge = await givenFridge(createdUser, { id: 'Fridge-1' });

		await expect(deleteFridge(fridge.id, createdUser2.id)).rejects.toThrow();
	});
});
