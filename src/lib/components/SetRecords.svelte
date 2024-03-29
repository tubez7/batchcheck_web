<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/utils.js";

  // PROPS
  export let records;

  // VARIABLES
  $: records = records === "" ? 0 : parseInt(records);
</script>

<h2>Records</h2>
<label for="batch-quantity">Batch/Record Qty*: </label>
<input
  bind:value={records}
  on:keydown={handleKeyDown}
  min="1"
  inputmode="numeric"
  id="batch-quantity"
  placeholder="Enter number of scans..."
/>
{#if records < 1}
  <p>(Values below 1 are not valid)</p>
{/if}
