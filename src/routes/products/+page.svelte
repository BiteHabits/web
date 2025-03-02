<script>
    import { enhance } from '$app/forms';
</script>

<h1>Register Product</h1>

<form class="mx-auto flex max-w-md flex-col gap-4" method="post" use:enhance>
    <label class="flex flex-col">
        Name
        <input name="name" class="rounded border p-1" required />
    </label>

    <label class="flex flex-col">
        Expiry Date
        <input type="date" name="expiry_date" class="rounded border p-1" required />
    </label>

    <label class="flex flex-col">
        Quantity
        <input type="number" name="quantity" class="rounded border p-1" required />
    </label>

    <label class="flex flex-col">
        Fridge ID
        <input name="fridge_id" class="rounded border p-1" required />
    </label>

    <button class="rounded bg-blue-500 p-1">Register Product</button>
</form>