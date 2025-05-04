import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { SessionService } from '$lib/services';

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		const session = locals.auth?.session;

		if (!session) {
			return fail(400, {
				message: 'Du er ikke logget inn.'
			});
		}

		await SessionService.deleteSession(session.id);
		SessionService.clearSessionCookie(cookies);

		return redirect(302, '/');
	}
};
