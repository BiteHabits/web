<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes;

	let { value = $bindable(), class: className, ...props }: Props = $props();
</script>

<input bind:value class={cn('h-10 rounded-xl border-2 px-2 py-1', className)} {...props} />
