<script lang="ts">
	import { getUser } from '$lib/context/user-context';

	let user = getUser();
</script>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-8 text-4xl font-light">Min profil</h1>

	<p>Navn: {$user!.name}</p>
	<p>E-post: {$user!.email}</p>
</div>
