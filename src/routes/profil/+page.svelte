<script lang="ts">
	import { getAuthenticatedUser } from '$lib/context/user-context';
	import { allergies } from '$lib/constants';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	let user = getAuthenticatedUser();
	let isLoading = $state(false);
</script>

<div class="mx-auto max-w-4xl">
	<form
		action="?/updateProfile"
		method="post"
		use:enhance={() => {
			return async ({ update }) => {
				isLoading = true;
				await update();
				isLoading = false;
			};
		}}
	>
		<h1 class="mb-8 text-4xl font-light">Min profil</h1>

		<label class="mb-4 flex flex-col">
			<span class="mb-1 ml-2 font-medium">Navn</span>
			<Input name="name" bind:value={$user.name} placeholder="Kari Nordmann" />
		</label>

		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">E-post</span>
			<Input name="email" bind:value={$user.email} placeholder="kari.nordmann@norge.no" />
		</label>

		<div>
			<h2 class="mb-4 mt-8 text-2xl font-light">Allergier</h2>
			<ul class="flex flex-wrap gap-x-6 gap-y-2">
				{#each allergies as allergy (allergy.id)}
					<li class="flex items-center gap-2">
						<label>
							<input
								name="allergies"
								class="rounded-md border-2"
								type="checkbox"
								checked={$user.allergies?.includes(allergy.id)}
								value={allergy.id}
							/>
							{allergy.name}
						</label>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mt-8 flex gap-4">
			<Button disabled={isLoading}>Lagre</Button>
			<Button type="button" onclick={() => toast.error('Jeg funker ikke')} variant="danger"
				>Slett profil</Button
			>
		</div>
	</form>
</div>
