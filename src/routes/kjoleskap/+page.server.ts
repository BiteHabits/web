import { db } from "$lib/db/drizzle";
import { AUTH_COOKIE_NAME } from "$lib/constants";
import type { PageServerLoad } from "./$types";
import { fridges } from "$lib/db/schemas/fridges";
import { eq } from "drizzle-orm";

// Function to get user ID from cookies
async function getUserFromCookies(cookies: Record<string, any>) {
    const sessionId = cookies.get(AUTH_COOKIE_NAME);
    if (!sessionId) return null;

    const session = await db.query.sessions.findFirst({
        where: (fields) => eq(fields.id, sessionId),
    });

    if (!session || session.expiresAt < new Date()) return null;

    return session.userId;
}

export const load: PageServerLoad = async ({ cookies }) => {
    let userId = await getUserFromCookies(cookies);
    if (userId === null) {
        return {
            fridges: []
        };
    }

    let val = await db
    .select()
    .from(fridges)
    .where(eq(fridges.userId, userId))

    return {
        fridges: val
    };
};

