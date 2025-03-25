<script lang="ts">
    export let text: string;   
    export let onClick: (() => void) | null;

</script>

<button class="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700" onclick="{onClick}">
	{text}
</button>
