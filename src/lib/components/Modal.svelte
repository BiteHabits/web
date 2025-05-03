<script lang="ts">
	import type { Snippet } from 'svelte';

	let { showModal, children }: { showModal: () => void; children: Snippet } = $props();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="absolute inset-0 bg-black opacity-50" onclick={showModal}></div>

	<div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
		<button
			class="absolute right-4 top-3 text-xl text-gray-600 hover:text-black"
			onclick={showModal}
		>
			&times;
		</button>

		{@render children?.()}
	</div>
</div>
