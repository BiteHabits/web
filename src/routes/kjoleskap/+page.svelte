<script lang="ts">
    export let data;
    console.log(data)
    $: fridges = data.fridges
</script>

<div class="container">
<!-- Navigation to Create Fridge -->
<a href="/kjoleskap/ny" class="create-fridge-button">
    Opprett nytt kjøleskap
</a>

<!-- Fridges List -->
    <div class="fridges-list">
        {#if fridges === undefined || fridges.length === 0}
            <p>Du har ingen kjøleskap ennå. Opprett ditt første!</p>
        {:else}
            <h2>Dine kjøleskap:</h2>
            <ul>
                {#each fridges as fridge}
                    <li>
                        <span>{fridge.name}</span>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }

    .create-fridge-button {
        display: inline-block;
        padding: 10px 15px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-bottom: 20px;
    }

    .create-fridge-button:hover {
        background-color: #45a049;
    }

    .fridges-list ul {
        list-style-type: none;
        padding: 0;
    }

    .fridges-list li {
        background-color: #f1f1f1;
        margin: 10px 0;
        padding: 15px;
        border-radius: 4px;
    }
</style>
