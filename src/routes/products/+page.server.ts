import { db } from "$lib/db/drizzle";
import { eq } from "drizzle-orm";
import type { Actions } from "@sveltejs/kit";
import { products } from "$lib/db/schemas";
import { AUTH_COOKIE_NAME } from "$lib/constants";

async function getUserFromCookies(cookies: Record<string, any>) {
    const sessionId = cookies.get(AUTH_COOKIE_NAME);
    if (!sessionId) return null;

    const session = await db.query.sessions.findFirst({
        where: (fields) => eq(fields.id, sessionId)
    });

    if (!session || session.expiresAt < new Date()) return null;

    return session.userId;
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const userId = await getUserFromCookies(cookies);
        if (!userId) {
            return {
                success: false,
                error: "You must be logged in to add a product."
            };
        }

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const expiry_date = formData.get('expiry_date') as string;
        const quantity = parseInt(formData.get('quantity') as string, 10);
        const fridge_id = formData.get('fridge_id') as string;

        if (!name || !expiry_date || isNaN(quantity) || !fridge_id) {
            return {
                success: false,
                error: 'Invalid input'
            };
        }

        await db.insert(products).values({
            name,
            expiry_date,
            quantity,
            fridge_id
        });

        return {
            success: true
        };
    }
};