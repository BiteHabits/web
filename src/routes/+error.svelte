<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="mx-auto flex flex-col gap-4 px-4 text-center text-gray-700">
	<p class="text-4xl font-medium">{page.status}</p>
	<p class="text-4xl font-medium">
		{page.status === 404 ? 'Finner ikke siden du ser etter.' : page.error?.message}
	</p>
</div>
