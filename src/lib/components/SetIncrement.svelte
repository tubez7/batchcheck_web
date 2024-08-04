<script>
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let incrementValue;
  export let validIncrement;
  export let hasSerial;
  export let editMode;

  // VARIABLES
  $: validIncrement = Number.isInteger(incrementValue) || !hasSerial;
</script>

<FieldItemStyle>
  <label for="increment">Increment value*:</label>
  <input
    bind:value={incrementValue}
    type="number"
    inputmode="numeric"
    id="increment"
    placeholder="Enter a whole integer (including negative values) to increment or decrement each record by"
    disabled={editMode}
  />
</FieldItemStyle>

{#if !validIncrement}
  <p class="error-msg">
    Number to increment serial by must be an integer (zero and negative values
    are accepted)
  </p>
{/if}

<style>
  .error-msg {
    margin-top: 0;
    color: red;
    font-weight: bolder;
  }
</style>
