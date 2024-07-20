<script>
  // IMPORTS
  import { handleKeyDown } from "$lib/utils.js";

  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let records;
  export let editMode;

  // VARIABLES
  $: records = records === "" ? 0 : parseInt(records);
  $: opaqueOverlay = editMode ? "edit" : "create";
</script>

<div class={opaqueOverlay}>
  <fieldset>
    <h2>Records</h2>
    <p class="msg">{"(Set the total number of records/batches for the job)"}</p>

    <FieldItemStyle>
      <label for="batch-quantity">Batch/Record Qty*:</label>
      <input
        bind:value={records}
        on:keydown={handleKeyDown}
        min="1"
        inputmode="numeric"
        id="batch-quantity"
        placeholder="Enter number of scans..."
        disabled={editMode}
      />
    </FieldItemStyle>

    {#if records < 1}
      <p class="error-msg">Values below 1 are not valid</p>
    {/if}
  </fieldset>
</div>

<style>
  .create {
    background-color: lightblue;
  }

  .edit {
    background-color: rgb(116, 148, 158);
    opacity: 0.5;
  }

  .error-msg {
    color: red;
    font-weight: bolder;
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
  }
</style>
