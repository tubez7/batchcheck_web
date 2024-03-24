<script>
  // PROPS
  export let incrementValue;
  export let validIncrement;

</script>

<label for="increment">Increment each batch/record by*: </label>
<input
  bind:value={incrementValue}
  type="number"
  inputmode="numeric"
  id="increment"
  placeholder="Enter a whole integer (including negative values) to increment or decrement each record by"
/>
{#if !validIncrement}
  <p>
    Number to increment serial by must be an integer (zero and negative values
    are accepted)
  </p>
{/if}


