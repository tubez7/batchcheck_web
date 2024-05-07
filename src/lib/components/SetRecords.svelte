<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/utils.js";

  // PROPS
  export let records;
  export let editMode;

  // VARIABLES
  $: records = records === "" ? 0 : parseInt(records);
  $: opaqueOverlay = editMode ? "edit" : "create";
</script>

<div id={opaqueOverlay}>
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
      disabled={editMode}
    />
    {#if records < 1}
      <p>(Values below 1 are not valid)</p>
    {/if}
  </fieldset>
</div>

<style>
  #create {
    background-color: lightblue;
  }

  #edit {
    background-color: rgb(116, 148, 158);
    opacity: 0.5;
  }
</style>
