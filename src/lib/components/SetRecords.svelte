<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/utils.js";

  // PROPS
  export let records;

  // VARIABLES
  $: records = records === "" ? 0 : parseInt(records);
</script>

<fieldset id="set-records-box">
  <h2>Records</h2>
  <p>Set the total number of records or batches for the job</p>
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
</fieldset>

<style>
  #set-records-box {
    background-color: lightblue;
  }
</style>
