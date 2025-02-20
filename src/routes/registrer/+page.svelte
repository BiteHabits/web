<script>
	import { enhance } from '$app/forms';
</script>

<h1>Registrer deg</h1>

<form class="mx-auto flex max-w-md flex-col gap-4" method="post" use:enhance>
	<label class="flex flex-col">
		Navn
		<input name="name" class="rounded border p-1" />
	</label>

	<label class="flex flex-col">
		E-post
		<input name="email" class="rounded border p-1" />
	</label>

	<label class="flex flex-col">
		Passord
		<input type="password" name="password" class="rounded border p-1" />
	</label>

	<button class="rounded bg-blue-500 p-1">Registrer deg</button>
</form>
