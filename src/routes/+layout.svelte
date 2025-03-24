<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { writable } from 'svelte/store';
	import { setUserContext } from '$lib/context/user-context';
	import { Toaster } from 'svelte-french-toast';

	let { data, children } = $props();

	const user = writable(data.user);
	$effect.pre(() => {
		user.set(data.user);
	});
	setUserContext(user);
</script>

<Toaster position="top-center" />
<Header />

{@render children()}
