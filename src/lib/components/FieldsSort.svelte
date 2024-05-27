<script>
  // IMPORTS
  import {
    checkSortOrder,
    resetArrayOrder,
    reverseArrayOrder,
  } from "../../lib/utils";

  // PROPS
  export let fields;
  export let editMode;
  export let compositeData;

  // VARIABLES
  $: arrayToSort = fields ? fields : compositeData;
  $: disableReset = checkSortOrder(arrayToSort);

  // FUNCTIONS
  function handleDelete(e) {
    // trigger warning here before executing
    e.preventDefault();
    fields ? (fields = []) : (compositeData = []);
  }

  function handleResetOrder(e) {
    e.preventDefault();
    fields
      ? (fields = resetArrayOrder(arrayToSort))
      : (compositeData = resetArrayOrder(arrayToSort));
  }

  function handleReverse(e) {
    e.preventDefault();
    fields
      ? (fields = reverseArrayOrder(arrayToSort))
      : (compositeData = reverseArrayOrder(arrayToSort));
  }
</script>

{#if editMode}
  <div id="container">
    <button on:click={handleResetOrder} disabled={disableReset}
      >RESET ORDER</button
    >
    <button on:click={handleReverse} disabled={arrayToSort.length < 2}
      >REVERSE ORDER</button
    >
    <button on:click={handleDelete} type="reset">DELETE ALL</button>
  </div>
{/if}
