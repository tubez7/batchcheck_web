<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData } from "$lib/stores";
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

  // PROPS
  export let tableGeneratePopUp;
  export let disabled;
  export let editMode;
  export let formValidated;

  // FUNCTIONS
  function toggleEditMode(e) {
    e.preventDefault();
    editMode = !editMode;
  }

  function generateTable(e) {
    e.preventDefault();
    tableGeneratePopUp = true;
    const tableName = encodeURIComponent("Richard's Table"); // hardcode to be replaced
    tableStoreData.set(fields);
    goto(`/${tableName}`);
  }
</script>

<FieldsetStyle --background="rgb(222, 222, 177)">
  <div class="button-block">
    <button on:click={generateTable} disabled={!formValidated}
      >GENERATE TABLE</button
    >

    <button on:click={toggleEditMode} {disabled}
      >{editMode ? "CREATE FIELDS" : "EDIT FIELDS"}</button
    >
  </div>
</FieldsetStyle>

<style>
  button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
  }

  /* .button-block {
    text-align: center;
  } */
</style>
