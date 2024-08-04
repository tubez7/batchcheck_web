<script>
  // IMPORTS
  import { compareEquality } from "$lib/utils.js";

  // COMPONENTS
  import CreateCompositeData from "$lib/components/CreateCompositeData.svelte";
  import FieldCard from "$lib/components/FieldCard.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import WarningAlert from "$lib/components/WarningAlert.svelte";

  // PROPS
  export let fields;
  export let fieldsClone;
  //export let records;
  export let indexToEdit;
  export let fieldToEdit;
  export let editPanelVisible;
  export let editMode;
  export let changeMade;
  export let warningPopUpVisible;

  // VARIABLES
  $: opaqueOverlay = editMode ? "edit" : "create";
  let createComposite = false;
  let compositeField = {};
  $: changeMade = !compareEquality(fields, fieldsClone);

  // ALERT VARIABLES
  let alert;
  let userConfirmation = false;
  let undo;

  // FUNCTIONS
  function userConfirmed(confirmation) {
    if (confirmation) {
      if (undo) {
        fieldsClone = [...fields];
      } else {
        fields = [...fieldsClone];
        fieldsClone = [...fields];
      }
      warningPopUpVisible = false;
    }
    userConfirmation = false;
  }

  function handleSave(e) {
    e.preventDefault();
    undo = false;
    alert = "Previous field data will be permanently overwritten.";
    warningPopUpVisible = true;
  }

  function handleUndo(e) {
    e.preventDefault();
    undo = true;
    alert = "All changes to fields will be permanently lost.";
    warningPopUpVisible = true;
  }

  $: userConfirmation, userConfirmed(userConfirmation);
</script>

{#if warningPopUpVisible}
  <PopUp --colour="rgb(250, 128, 128)" header="WARNING!">
    <WarningAlert bind:warningPopUpVisible bind:userConfirmation {alert} />
  </PopUp>
{/if}

<div class={opaqueOverlay}>
  <FieldsetStyle --colour="rgb(114, 113, 113)">
    <h2 class="header">Field Editor</h2>

    {#if fieldsClone.length < 1 && editMode}
      <p>NO FIELD DATA TO EDIT</p>
    {/if}

    {#if fieldsClone.length > 0}
      <FieldsSort bind:fieldsClone {editMode} compositeData={null} />

      <FieldsetStyle --background="rgb(166, 182, 255)">
        {#each fieldsClone as field, i}
          <FieldCard
            bind:fieldsClone
            bind:indexToEdit
            bind:fieldToEdit
            bind:editPanelVisible
            bind:createComposite
            bind:compositeField
            {field}
            {editMode}
            index={i}
          />
        {/each}
      </FieldsetStyle>
    {/if}
    {#if editMode}
      <FieldsetStyle --colour="rgb(114, 113, 113)" --background="rgb(234, 204, 252)">
        <div class="button-block">
          <button on:click={handleSave} disabled={!changeMade}
            >CONFIRM & SAVE</button
          >
          <button id="undo-button" on:click={handleUndo} disabled={!changeMade}
            >UNDO CHANGES</button
          >
        </div>
      </FieldsetStyle>
    {/if}
  </FieldsetStyle>
</div>

{#if createComposite}
  <PopUp
    --colour="cyan"
    header="Create Composite Data"
    subHeader={compositeField.name}
  >
    <CreateCompositeData
      bind:createComposite
      bind:fieldsClone
      {compositeField}
      index={indexToEdit}
    />
  </PopUp>
{/if}

<style>
  .edit {
    background-color: rgb(225, 184, 251);
    border-radius: 1em;
  }

  .create {
    background-color: rgb(155, 93, 194);
    opacity: 0.5;
    border-radius: 1em;
  }

  .button-block {
    text-align: center;
  }

  .header {
    margin-top: 0.25em;
    margin-bottom: 0.5em;
  }

  button {
    height: 3em;
    width: 10em;
    /* margin-top: 1em; */
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-radius: 1em;
  }
</style>
