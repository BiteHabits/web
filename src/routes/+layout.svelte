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
<div class="flex min-h-screen w-full flex-col">
	<Header />

	<div class="w-full flex-1">
		{@render children()}
	</div>

	<footer class="mt-32 h-52 rounded-t-3xl border-2 border-blue-800 bg-blue-500"></footer>
</div>
