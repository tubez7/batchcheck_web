<script>
  // IMPORTS
  import {
    checkSortOrder,
    resetArrayOrder,
    reverseArrayOrder,
  } from "../../lib/utils";
  export let fields;
  export let editMode;

  // VARIABLES
  $: disableReset = checkSortOrder(fields);

  // FUNCTIONS
  function handleDelete(e) {
    // trigger warning here before executing
    e.preventDefault();
    fields = [];
  }

  function handleResetOrder(e) {
    e.preventDefault();
    fields = resetArrayOrder(fields);
  }

  function handleReverse(e) {
    e.preventDefault();
    fields = reverseArrayOrder(fields);
  }
</script>

{#if editMode}
  <div id="container">
    <button on:click={handleResetOrder} disabled={disableReset}
      >RESET ORDER</button
    >
    <button on:click={handleReverse} disabled={fields.length < 2}
      >REVERSE ORDER</button
    >
    <button on:click={handleDelete} type="reset">DELETE ALL</button>
  </div>
{/if}
