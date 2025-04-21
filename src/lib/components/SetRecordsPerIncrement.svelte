<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/utils.js";

  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let recordsPerIncrement;
  export let validRecordsPerIncrement;
  export let hasSerial;
  export let editMode;

  // VARIABLES
  $: validRecordsPerIncrement = hasSerial
    ? recordsPerIncrement > 0 && Number.isInteger(recordsPerIncrement)
    : true;
</script>

<FieldItemStyle>
  <label for="records-per-increment">Records per increment*:</label>
  <input
    bind:value={recordsPerIncrement}
    on:keydown={handleKeyDown}
    type="number"
    min="1"
    inputmode="numeric"
    id="records-per-increment"
    placeholder="Number increments every 'x' records"
    disabled={editMode}
  />
</FieldItemStyle>

{#if !validRecordsPerIncrement}
  <p class="error-msg">
    Record per increment value must be an integer of 1 or greater
  </p>
{/if}

<style>
  .error-msg {
    margin-top: 0;
    color: red;
    font-weight: bolder;
  }
</style>
