<script>
  // IMPORTS
  import {
    checkSortOrder,
    resetArrayOrder,
    reverseArrayOrder,
  } from "../../lib/utils";
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

  // PROPS
  export let fieldsClone;
  export let editMode;
  export let compositeData;

  // VARIABLES
  $: arrayToSort = fieldsClone ? fieldsClone : compositeData;
  $: disableReset = checkSortOrder(arrayToSort);
  $: backgroundColour = fieldsClone
    ? "rgb(234, 204, 252)"
    : "rgb(214, 193, 99)";
  $: marginBottom = fieldsClone ? "0.75em" : "0.2em";

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
  <FieldsetStyle --background={backgroundColour} --margin-bottom={marginBottom}>
    <div class="button-block">
      <button on:click={handleResetOrder} disabled={disableReset}
        >RESET ORDER</button
      >
      <button on:click={handleReverse} disabled={arrayToSort.length < 2}
        >REVERSE ORDER</button
      >
      <button on:click={handleDelete} type="reset" disabled={arrayToSort.length < 1}>DELETE ALL</button>
    </div>
  </FieldsetStyle>
{/if}

<style>
  .button-block {
    text-align: center;
  }

  button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
  }
</style>
