import type { User } from '$lib/db/schemas';
import { getContext, setContext } from 'svelte';
import { get, type Writable } from 'svelte/store';

export type UserContext = Writable<User | null>;

const AUTH_CONTEXT_KEY = '__auth';

export const setUserContext = (value: UserContext) => {
	return setContext<UserContext>(AUTH_CONTEXT_KEY, value);
};

export const getUser = () => {
	return getContext<UserContext>(AUTH_CONTEXT_KEY);
};

export const getAuthenticatedUser = () => {
	const userStore = getUser();

	if (!get(userStore)) {
		throw new Error('User context not found');
	}

	return userStore as Writable<User>;
};
