<script lang="ts">
	export let text: string;
	export let onClick: (() => void) | null;
</script>

<button
	class="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
	onclick={onClick}
>
	{text}
</button>
