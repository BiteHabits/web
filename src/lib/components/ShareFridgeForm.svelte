<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { ActionResult } from '@sveltejs/kit';

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

<div class="share-fridge-form">
	<form method="POST" action="?/shareFridge" use:enhance={handleSubmit}>
		<input type="hidden" name="fridge_id" value={fridgeId} />
		<div>
			<label for="email">User Email</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Enter email address"
				required
				class="mb-3 w-full rounded border p-2"
			/>
		</div>
		<button class="share-button" type="submit">Share Fridge</button>
	</form>
</div>

<style>
	.share-button {
		background-color: #4caf50;
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 0.9em;
		border: none;
		cursor: pointer;
	}

	.share-button:hover {
		background-color: #45a049;
	}
</style>
