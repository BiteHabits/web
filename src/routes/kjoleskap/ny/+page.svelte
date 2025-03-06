<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";

    let fridgeName = '';
    let error = '';

    function handleSubmit(){
        if (fridgeName.length < 2){
            error = 'Kjøleskap må være minst 2 tegn langt';
            return;
        }
    }
</script>

<div class="container">
<h1>Oprett nytt kjøleskap</h1>
    <form method="POST" use:enhance={() =>{
        return async ({ result, update }) => {
            if (result.type === 'success'){
                await goto('/kjoleskap');
            } else {
                await update();
            }
        };
        }} on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
                <label for="name">Navn på kjøleskap</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    bind:value={fridgeName}
                    required
                    minlength="2"
                    maxlength="50"
                    placeholder="Eks: Hjemmekjøleskap"
                />
            </div>

        {#if error}
            <p class="error">{error}</p>
        {/if}

        <div class="button-group">
            <a href="/kjoleskap" class="cancel-button">Avbryt</a>
            <button type="submit" class="submit-button">Opprett kjøleskap</button>
        </div>
        </form>
</div>

<style>
    .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
    }

    .cancel-button, .submit-button {
        padding: 10px 15px;
        border-radius: 4px;
        text-decoration: none;
    }

    .cancel-button {
        background-color: #f1f1f1;
        color: #333;
        border: 1px solid #ccc;
    }

    .submit-button {
        background-color: #4CAF50;
        color: white;
        border: none;
    }

    .error {
        color: red;
        margin-bottom: 20px;
    }
</style>
