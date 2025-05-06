<script lang="ts">
	import '../app.css';
	import { Github } from '@lucide/svelte';
	import Header from '$lib/components/Header.svelte';
	import { writable } from 'svelte/store';
	import { setUserContext } from '$lib/context/user-context';
	import { Toaster } from 'svelte-sonner';

	let { data, children } = $props();

	const user = writable(data.user);
	$effect.pre(() => {
		user.set(data.user);
	});
	setUserContext(user);
</script>

<Toaster position="top-center" richColors />
<div class="flex min-h-screen w-full flex-col">
	<Header />

	<div class="w-full flex-1 px-4">
		{@render children()}
	</div>

	<footer
		class="mt-32 flex items-center justify-between rounded-t-3xl border-2 border-blue-800 bg-blue-500 px-8 py-10"
	>
		<div>
			<p class="font-medium text-white">BiteHabits © {new Date().getFullYear()}</p>
		</div>

		<div>
			<a
				href="https://github.com/bitehabits"
				class="text-white transition-colors hover:text-gray-300"
				target="_blank"
			>
				<Github />
			</a>
		</div>
	</footer>
</div>
