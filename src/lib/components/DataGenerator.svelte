<script>
  // IMPORTS
  import { tableStoreData, totalRowsStored } from "$lib/stores";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  // COMPONENTS
  import ActionButtons from "$lib/components/ActionButtons.svelte";
  import CreateFields from "$lib/components/CreateFields.svelte";
  import EditFields from "$lib/components/EditFields.svelte";
  import FieldEditPanel from "$lib/components/FieldEditPanel.svelte";
  import GenerateTable from "$lib/components/GenerateTable.svelte";
  import Headers from "$lib/components/Headers.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import SetRecords from "$lib/components/SetRecords.svelte";

  // VARIABLES
  let fields = [];
  let receivedData;
  let records;
  let editPanelVisible = false;
  let warningPopUpVisible = false;
  let tableGeneratePopUp = false;
  let createComposite = false;
  $: popUpActive =
    editPanelVisible ||
    warningPopUpVisible ||
    createComposite ||
    tableGeneratePopUp;
  let indexToEdit = 0;
  let fieldToEdit = {};
  let editMode = false;
  let fieldsClone = [];
  let changeMade = false;
  $: disabled = editMode ? changeMade : fields.length < 1;
  $: formValidated = fields.length > 0 && records > 0 && !changeMade;

  // FUNCTIONS
  onMount(() => {
    tableGeneratePopUp = false;
    receivedData = get(tableStoreData);
    records = get(totalRowsStored);
    fieldsClone = receivedData.length > 0 ? receivedData : fieldsClone;
    fields = receivedData.length > 0 ? receivedData : fields;
  });
</script>

<main class="app-window">
  {#if popUpActive}
    <div id="opaque-filter"></div>
  {/if}

  {#if tableGeneratePopUp}
    <PopUp header="Table Name" --colour="rgb(80, 162, 171)">
      <GenerateTable bind:tableGeneratePopUp {fields} {records} />
    </PopUp>
  {/if}

  <h1>BATCH-CHECK alpha (v1.0)</h1>
  <div class="app-container">
    <Headers />
    <ActionButtons
      bind:editMode
      bind:tableGeneratePopUp
      {disabled}
      {formValidated}
    />

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
</style>
