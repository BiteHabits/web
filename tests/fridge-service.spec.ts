import { describe, expect, it } from "vitest";
import { givenFridge } from "./fixtures/fridges";
import { givenUser } from "./fixtures/users";
import { createFridge, deleteFridge, getFridgeById, updateFridge } from "$lib/services/fridge.service"

describe('FridgeService',() => {
    it('should return a fridge', async() => {
        let createdUser = await givenUser({ id: 'user-1' });
        await givenFridge(createdUser,{id: 'Fridge-1'})

        const fridge = await getFridgeById(createdUser.id, 'Fridge-1');

        expect(fridge).not.toBeNull();
        expect(fridge?.creator).toBe(createdUser);
        expect(fridge?.id).toBe('Fridge-1');
        expect(fridge?.members.map(member => member.id)).toContain(createdUser.id);
    });

    it('should throw an error when a non member tries to retrieve a fridge', async() => {
        let createdUser = await givenUser({id: 'user-1'});
        let createdUser2 = await givenUser({id: 'user-2'});
        await givenFridge(createdUser,{id: 'Fridge-1'})
        await expect(getFridgeById(createdUser2.id, 'Fridge-1')).rejects.toThrow();
    })

    it('should create a fridge', async() => {
        let createdUser = await givenUser({ id: 'user-1' });

        const createdFridge = await createFridge('Fridge-1',createdUser.id);

        expect(createdFridge).not.toBeNull();
        expect(createdFridge?.userId).toBe(createdUser.id);
        expect(createdFridge?.id).toBe('Fridge-1');

        let foundFridge = await getFridgeById('Fridge-1', createdUser.id);

        expect(foundFridge).not.toBeNull();
        expect(foundFridge?.creator).toBe(createdUser);
        expect(foundFridge?.id).toBe('Fridge-1');
        expect(foundFridge?.members.map(member => member.id)).toContain(createdUser.id);
    })

    it('should update the name of the fridge', async() => {
        let createdUser = await givenUser({ id: 'user-1' });

        const createdFridge = await createFridge('Fridge-1',createdUser.id);

        const updatedFridge = await updateFridge(createdFridge?.id ?? 'Fridge-1',"new-name", createdUser.id)
        
        expect(updatedFridge).not.toBeNull();

        let foundFridge = await getFridgeById('Fridge-1', createdUser.id);

        expect(foundFridge).not.toBeNull();
        expect(foundFridge?.name).toBe('new-name')
        expect(foundFridge?.creator).toBe(createdUser);
        expect(foundFridge?.id).toBe('Fridge-1');
        expect(foundFridge?.members.map(member => member.id)).toContain(createdUser.id);
    })

    it('should throw an error when a non creator tries to update a fridge', async() =>{
        let createdUser = await givenUser({ id: 'user-1' });
        let createdUser2 = await givenUser({ id: 'user-2' });

        await givenFridge(createdUser, {id: 'Fridge-1'});

        await expect(updateFridge('Fridge-1', 'new-name', createdUser2.id)).rejects.toThrow();
    })

    it('should delete a fridge', async() => {
        let createdUser = await givenUser({ id: 'user-1' });

        let fridge = await givenFridge(createdUser, {id: 'Fridge-1'});

        let deletedFridge = await deleteFridge(fridge.id, createdUser.id);
        
        expect(deletedFridge).not.toBeNull();

        let foundFridge = await getFridgeById('Fridge-1', createdUser.id);

        expect(foundFridge).toBeNull();
    })

    it('should throw an error when a non creator tries to delete a fridge', async()=>{
        let createdUser = await givenUser({ id: 'user-1' });
        let createdUser2 = await givenUser({ id: 'user-2' });

        let fridge = await givenFridge(createdUser, {id: 'Fridge-1'});

        await expect(deleteFridge(fridge.id, createdUser2.id)).rejects.toThrow();
    })
})
