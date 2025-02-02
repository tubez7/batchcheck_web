<script>
  // IMPORTS
  import { goto } from "$app/navigation";
  import { tableStoreData } from "$lib/stores";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  // COMPONENTS
  import CreateFields from "$lib/components/CreateFields.svelte";
  import EditFields from "$lib/components/EditFields.svelte";
  import FieldEditPanel from "$lib/components/FieldEditPanel.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import SetRecords from "$lib/components/SetRecords.svelte";

  // VARIABLES
  let fields = [];
  let receivedData;
  let records = 1;
  let editPanelVisible = false;
  let warningPopUpVisible = false;
  let createComposite = false;
  $: popUpActive = editPanelVisible || warningPopUpVisible || createComposite;
  let indexToEdit = 0;
  let fieldToEdit = {};
  let editMode = false;
  let fieldsClone = [];
  let changeMade = false;
  $: disabled = editMode ? changeMade : fields.length < 1;
  $: formValidated = fields.length > 0 && records > 0 && !changeMade;

  // FUNCTIONS
  onMount(() => {
    receivedData = get(tableStoreData);
    fieldsClone = receivedData.length > 0 ? receivedData : fieldsClone;
    fields = receivedData.length > 0 ? receivedData : fields;
  });

  function toggleEditMode(e) {
    e.preventDefault();
    editMode = !editMode;
  }

  function generateTable(e) {
    e.preventDefault();
    const tableName = encodeURIComponent("Richard's Table"); // hardcode to be replaced
    tableStoreData.set(fields);
    goto(`/${tableName}`);
  }

  // DEBUG WATCHERS
  // $: console.log("Records = ", records);
  //$: console.log("Fields has changed!...", fields);
  //$: console.log("fieldsClone has changed!...", fieldsClone);
  // $: console.log("formValidated = ", formValidated);
  // $: console.log("indexToEdit = ", indexToEdit);
  //$: console.log("fieldToEdit = ", fieldToEdit);
</script>

<main class="app-window">
  {#if popUpActive}
    <div id="opaque-filter"></div>
  {/if}

  <h1>BATCH-CHECK v1.0</h1>
  <div class="app-container">
    <h2 class="header">Batch-Check Constructor</h2>

    <p class="note">NB - * denotes a mandatory parameter</p>

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

    <div class="container">
      <div class="divider">
        <form>
          <SetRecords bind:records {editMode} />
          <CreateFields bind:fields bind:fieldsClone {editMode} />
        </form>
      </div>

      <div class="divider">
        <EditFields
          bind:fields
          bind:fieldsClone
          bind:indexToEdit
          bind:fieldToEdit
          bind:editPanelVisible
          bind:changeMade
          bind:warningPopUpVisible
          bind:createComposite
          {editMode}
        />
      </div>
    </div>
  </div>

  {#if editPanelVisible}
    <FieldEditPanel
      bind:fieldsClone
      bind:editPanelVisible
      bind:warningPopUpVisible
      field={fieldToEdit}
      index={indexToEdit}
    />
  {/if}
</main>

<style>
  .app-window {
    min-width: 1250px;
    max-width: 1350px;
    margin: auto;
    padding: 0;
  }

  .container {
    display: flex;
    flex-direction: row;
    min-width: 100%;
  }

  .divider {
    flex: 1;
    max-width: 50%;
    margin-left: 0.25em;
    margin-right: 0.25em;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(245, 245, 220);
    border-style: solid;
    border-radius: 1em;
    padding: 1em;
    margin-bottom: 25px;
  }

  .button-block {
    text-align: center;
  }

  .header {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    align-self: baseline;
  }

  #opaque-filter {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: black;
    filter: opacity(85%);
  }

  button {
    height: 3em;
    width: 10em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
  }

  .note {
    align-self: baseline;
    margin-bottom: 0;
  }
</style>
