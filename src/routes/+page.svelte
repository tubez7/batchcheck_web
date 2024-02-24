<script>
    let name = "";
    let input = "";
    let showMoreStuff = false;

    function handleClick(e) {
        e.preventDefault();
        name = input;
        input = "";
    }

    function handleChange(e) {
        e.preventDefault();
        input = e.target.value;
    }

    function show(e) {
        e.preventDefault();
        showMoreStuff = true;
    }

    function hide(e) {
        e.preventDefault();
        showMoreStuff = false;
    }
</script>

<h1>Hello {name || "World"}!! Welcome to SvelteKit</h1>
<button type="button" on:click={handleClick}>Change your name</button>
<input type="text" placeholder="Enter your name here" value={input} on:change={handleChange}>
<br>
<br>
{#if !showMoreStuff}
<button type="button" on:click={show}>SEE ME NOW</button>
{/if}

{#if showMoreStuff}
    <p>CAN YOU SEE THIS??</p>
    <button type="button" on:click={hide}>HIDE ME NOW!!</button>
{/if}