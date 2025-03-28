<script lang="ts">
	let { text, onClick }: { text: string; onClick: (() => void) | null } = $props();
</script>

<button
	class="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
	onclick={onClick}
>
	{text}
</button>
