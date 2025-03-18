import { db } from "$lib/db/drizzle";
import { fridges, fridgeUsers, type FridgeInsert, type UserInsert } from "$lib/db/schemas";
import { nanoid } from "nanoid";

export const givenFridge = async(user?: Partial<UserInsert>, fridge?: Partial<FridgeInsert>) =>{
    const fridgeInsert = {
        id: fridge?.id ?? nanoid(),
        name: fridge?.name ?? "Test",
        userId: fridge?.userId ?? user?.id ?? "Non saved user"
    }

    await db.insert(fridges).values(fridgeInsert);
    await db.insert(fridgeUsers).values({
        fridge_id: fridgeInsert.id,
        user_id: user?.id ?? "Test-id"
    });

    return fridgeInsert;
}
