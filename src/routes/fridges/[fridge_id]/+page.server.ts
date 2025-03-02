import { db } from "$lib/db/drizzle";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const fridge_id = params.fridge_id;

    const products = await db.query.products.findMany({
        where: (fields) => eq(fields.fridge_id, fridge_id)
    });

    console.log('Fetched products:', products); // log the fetched products

    return {
        fridge_id,
        products
    };
};