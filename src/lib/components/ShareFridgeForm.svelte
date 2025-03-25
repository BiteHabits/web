<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { ActionResult } from '@sveltejs/kit';
	import Button from '$lib/components/Button.svelte';

	type Props = {
		fridgeId: string;
	};

	let { fridgeId }: Props = $props();

	function handleSubmit() {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				const data = result.data;
				if (data && data.success) {
					toast.success(data.message || 'Fridge shared successfully!');
				} else {
					toast.error(data?.error || 'Failed to share fridge.');
				}
			} else if (result.type === 'failure') {
				toast.error(result.data?.error || 'Failed to share fridge.');
			} else {
				toast.error('An unexpected error occurred.');
			}
		};
	}
</script>

<div class="w-full">
	<form
		method="POST"
		action="?/shareFridge"
		use:enhance={handleSubmit}
		class="flex flex-col gap-4"
	>
		<input type="hidden" name="fridge_id" value={fridgeId} />

		<label for="email" class="block font-bold">Bruker e-post</label>
		<p class="text-gray-500">Skriv inn e-post til bruker du vil dele med.</p>
		<input
			type="email"
			id="email"
			name="email"
			placeholder="E-post"
			required
			class="w-full rounded border p-2"
		/>
		<Button text="Del kjøleskap" onClick={null} />
	</form>
</div>
