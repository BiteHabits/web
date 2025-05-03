<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type DefaultProps = {
		variant?: 'danger';
	};

	type Props = DefaultProps &
		(
			| (HTMLAnchorAttributes & {
					href: string;
			  })
			| HTMLButtonAttributes
		);

	let { children, variant, class: className, ...props }: Props = $props();
</script>

{#if 'href' in props}
	<a
		class={cn(
			'flex h-10 items-center justify-center rounded-xl border-2 border-blue-800 bg-blue-600 px-2 font-medium text-white transition-colors hover:bg-blue-700',
			'disabled:cursor-not-allowed disabled:opacity-50',
			variant === 'danger' && 'border-red-800 bg-red-600 hover:bg-red-700',
			className
		)}
		{...props}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		class={cn(
			'flex h-10 items-center justify-center rounded-xl border-2 border-blue-800 bg-blue-600 px-2 font-medium text-white transition-colors hover:bg-blue-700',
			'disabled:cursor-not-allowed disabled:opacity-50',
			variant === 'danger' && 'border-red-800 bg-red-600 hover:bg-red-700',
			className
		)}
		{...props}
	>
		{@render children?.()}
	</button>
{/if}
