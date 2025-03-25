<script>
    import slugify from '$lib/utils/slugify';

    let recipes = [{
        name: "spagetti",
        image: "$lib/assets/user-icon.svg",
        ingredients: [
            { name: "pasta" },
            { name: "tomatsaus" },
            { name: "kjøttdeig" }
        ],
        steps: [
            "kok pasta",
            "stek kjøttdeig",
            "bland alt sammen"
        ]    
    },
    {
        name: "pannekaker",
        image: "$lib/assets/user-icon.svg",
        ingredients: [
            { name: "mel" },
            { name: "egg" },
            { name: "melk" }
        ],
        steps: [
            "bland alt sammen",
            "stek pannekaker"
        ]
    },
    {
        name: "grønnsakssuppe",
        image: "$lib/assets/user-icon.svg",
        ingredients: [
            { name: "vann" },
            { name: "grønnsaker" },
            { name: "buljong" }
        ],
        steps: [
            "kok grønnsaker",
            "tilsett buljong",
            "server"
        ]
    }
];

</script>

{#if recipes}
    <main class="flex flex-col items-center gap-4">
        <ul class="flex flex-col items-center gap-2">
            {#each recipes as recipe}
                <li class="p-3 w-64 text-center border-2 border-gray-700 rounded-lg hover:bg-green-200"><a href="/recipes/{slugify(recipe.name)}">{recipe.name}</a></li>
            {/each}
        </ul>
    </main>

{:else}
    <p class="text-center">Ingen oppskrifter tilgjengelig.</p>
{/if}