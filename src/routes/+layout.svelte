<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { writable } from 'svelte/store';
	import { setUserContext } from '$lib/context/user-context';

	let { data, children } = $props();

	const user = writable(data.user);
	$effect.pre(() => {
		user.set(data.user);
	});
	setUserContext(user);
</script>

<Header />

{@render children()}
