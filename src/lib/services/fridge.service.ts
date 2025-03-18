import { db } from '$lib/db/drizzle'
import { fridges, fridgeUsers } from '$lib/db/schemas'
import { eq } from 'drizzle-orm/sql';
import { nanoid } from 'nanoid'

export class FridgeError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'FridgeError';
    }
}

const authAdmin = async(fridgeId: string, userId: string) => {
    const fridge = await db.query.fridges.findFirst({
        where: (row, { eq }) => eq(row.id, fridgeId)
    });

    if (!fridge || userId !== fridge.userId){
        throw new FridgeError('Unauthorized')
    }
}

const authMember = async(fridgeId: string, userId: string) => {
    const isMember = await db.query.fridgeUsers.findFirst({
        where: (row, { and, eq}) => and(
            eq(row.fridge_id, fridgeId),
            eq(row.user_id, userId)
        )
    });

    if (!isMember){
        throw new FridgeError('Unauthorized - Not a fridge member')
    }
}

//Create
//Create a new fridge set the creator as admin user
//Add the creatorUser to the fridgeUsers table
export const createFridge = async(name: string, CreatorUserId: string) => {
    try{
        let fridgeId = nanoid();

        // await db.transaction(async (tx) => {
        //     await tx.insert(fridges).values({
        //         id: fridgeId,
        //         name: name,
        //         userId: CreatorUserId
        //     });
        //
        //     await tx.insert(fridgeUsers).values({
        //         user_id: CreatorUserId,
        //         fridge_id: fridgeId
        //     });
        // });
        await db.insert(fridges).values({
                id: fridgeId,
                name: name,
                userId: CreatorUserId
        })

        await db.insert(fridgeUsers).values({
            user_id: CreatorUserId,
            fridge_id: fridgeId
        })

        return db.query.fridges.findFirst({
            where: (row, { eq }) => eq(row.id, fridgeId)
        });
    } catch(error){
        if (error instanceof Error && error.message.includes('UNIQUE constraint')){
            throw new FridgeError('Fridge name already exists for this user')
        }
    throw new FridgeError('Could not create fridge')
    } 
};

//Read
//Return the fridgeInfo for the given fridgeId
export const getFridgeById = async(fridgeId: string, userId: string) =>{
    await authMember(fridgeId,userId);
    const fridge = await db.query.fridges.findFirst({
        where: (row, { eq }) => eq(row.id, fridgeId),
            with: {
            user: true,
            fridgeUsers: {
                columns: { user_id: true },
                with: {user: true }
            }
        }
    });

    if (!fridge){
        return null;
    }

    return {
        id: fridge.id,
        name: fridge.name,
        creator: fridge.userId,
    };
};

//Update
//Update the fridge with the given fridgeId only if the User doing it is the 
//creator of the fridge
export const updateFridge = async(fridgeId: string, name: string, userId: string) =>{
    await authAdmin(fridgeId, userId);

    // return db.transaction(async (tx) => {
    //     const result = await tx.update(fridges)
    //     .set({ name })
    //     .where(eq(fridges.id, fridgeId))
    //     return result;
    // })
    
    return db.update(fridges)
        .set({ name })
        .where(eq(fridges.id, fridgeId))
}

//Delete
//Delete the fridge with the given fridgeId only if the 
//user doing it is the creatorUser
export const deleteFridge = async(fridgeId: string, userId: string) =>{
    await authAdmin(fridgeId, userId);

    // return db.transaction(async (tx) => {
    //     await tx.delete(fridgeUsers)
    //     .where(eq(fridgeUsers.fridge_id, fridgeId));
    //
    //     return tx.delete(fridges)
    //     .where(eq(fridges.id,fridgeId))
    // })
    
    let result = await db.delete(fridges)
     .where(eq(fridges.id,fridgeId))
     
     await db.delete(fridgeUsers)
     .where(eq(fridgeUsers.fridge_id, fridgeId));

     return result;
}
