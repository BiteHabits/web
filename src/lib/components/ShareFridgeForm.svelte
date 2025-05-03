<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { ActionResult } from '@sveltejs/kit';
	import Button from '$lib/components/ui/Button.svelte';

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
	<form method="POST" action="?/shareFridge" use:enhance={handleSubmit} class="flex flex-col gap-4">
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

		<Button>Del kjøleskap</Button>
	</form>
</div>
