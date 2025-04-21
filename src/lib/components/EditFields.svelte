<script>
  // IMPORTS
  import { compareEquality } from "$lib/utils.js";

  // COMPONENTS
  import CreateCompositeData from "$lib/components/CreateCompositeData.svelte";
  import FieldCard from "$lib/components/FieldCard.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";
  import WarningAlert from "$lib/components/WarningAlert.svelte";

  // PROPS
  export let createComposite;
  export let fields;
  export let fieldsClone;
  export let indexToEdit;
  export let fieldToEdit;
  export let editPanelVisible;
  export let editMode;
  export let changeMade;
  export let warningPopUpVisible;

  // VARIABLES
  $: opaqueOverlay = editMode ? "edit" : "create";
  let compositeField = {};
  $: changeMade = !compareEquality(fields, fieldsClone);
  $: borderColour = changeMade ? "red" : "rgb(114, 113, 113)";
  $: borderWidth = changeMade ? "thick" : "initial";

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
    alert = "Previous field data will be permanently overwritten";
    warningPopUpVisible = true;
  }

  function handleUndo(e) {
    e.preventDefault();
    undo = true;
    alert = "All changes to fields will be permanently lost";
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
        <div class="scroll-bar">
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
        </div>
      </FieldsetStyle>
    {/if}
    {#if editMode}
      <FieldsetStyle
        --colour={borderColour}
        --width={borderWidth}
        --background="rgb(234, 204, 252)"
      >
        <div class="button-block">
          <TwoButtons
            --hover1="rgb(66, 237, 180)"
            --hover2="rgb(250, 128, 128)"
            callbackFunc1={handleSave}
            callbackFunc2={handleUndo}
            button1text="CONFIRM & SAVE"
            button2text="UNDO CHANGES"
            disableButton1={!changeMade}
            disableButton2={!changeMade}
            type1="button"
            type2="button"
          />
        </div>
      </FieldsetStyle>
    {/if}
  </FieldsetStyle>
</div>

{#if createComposite}
  <PopUp
    --colour="rgb(255, 225, 71)"
    --pad="1em 0.5em"
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

  .scroll-bar {
    max-height: 43em;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 0.75em;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(62, 60, 83);
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(80, 76, 159);
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(53, 50, 116);
  }
</style>
