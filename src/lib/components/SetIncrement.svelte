<script>
  // PROPS
  export let incrementValue;
  export let validIncrement;
  export let hasSerial;
  export let editMode;

  // VARIABLES
  $: validIncrement = Number.isInteger(incrementValue) || !hasSerial;
</script>

<label for="increment">Increment each batch/record by*: </label>
<input
  bind:value={incrementValue}
  type="number"
  inputmode="numeric"
  id="increment"
  placeholder="Enter a whole integer (including negative values) to increment or decrement each record by"
  disabled={editMode}
/>
{#if !validIncrement}
  <p>
    Number to increment serial by must be an integer (zero and negative values
    are accepted)
  </p>
{/if}
