<script>
  // IMPORTS
  import {
    checkSortOrder,
    resetArrayOrder,
    reverseArrayOrder,
  } from "../../lib/utils";
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let fieldsClone;
  export let editMode;
  export let compositeData;

  // VARIABLES
  $: arrayToSort = fieldsClone ? fieldsClone : compositeData;
  $: disableReset = checkSortOrder(arrayToSort);

  // FUNCTIONS
  function handleDelete(e) {
    e.preventDefault();
    fieldsClone ? (fieldsClone = []) : (compositeData = []);
  }

  function handleResetOrder(e) {
    e.preventDefault();
    fieldsClone
      ? (fieldsClone = resetArrayOrder(arrayToSort))
      : (compositeData = resetArrayOrder(arrayToSort));
  }

  function handleReverse(e) {
    e.preventDefault();
    fieldsClone
      ? (fieldsClone = reverseArrayOrder(arrayToSort))
      : (compositeData = reverseArrayOrder(arrayToSort));
  }
</script>

{#if editMode}
  <FieldItemStyle>
    <button on:click={handleResetOrder} disabled={disableReset}
      >RESET ORDER</button
    >
    <button on:click={handleReverse} disabled={arrayToSort.length < 2}
      >REVERSE ORDER</button
    >
    <button on:click={handleDelete} type="reset">DELETE ALL</button>
  </FieldItemStyle>
{/if}

<style>
  button {
    height: 3em;
    width: 10em;
  }
</style>
