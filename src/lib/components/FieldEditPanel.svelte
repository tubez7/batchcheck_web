<script>
  // IMPORTS
  import { compareEquality } from "$lib/utils.js";
  // COMPONENTS
  import EditFieldButtons from "$lib/components/EditFieldButtons.svelte";
  import PopUp from "$lib/components/PopUp.svelte";

  // PROPS
  export let editPanelVisible;
  export let fieldsClone;
  export let field;
  export let index;

  // VARIABLES
  let fieldClone = { ...field };
  $: changeMade = !compareEquality(field, fieldClone);

  // FIELD NAME VARIABLES
  let validFieldName = true;
  let editFieldName = false;

  // SERIAL VARIABLES
  let validSerial = true;
  let editSerial = false;
  let validIncrement = true;
  let editIncrement = false;
  let editRecordsPerIncrement = false;
  let validRecordsPerIncrement = true;

  // PAD VARIABLES
  let validPadLength = true;
  let editPad = false;

  // PREFIX/SUFFIX VARIABLES
  let editPrefix = false;
  let editSuffix = false;

  // FIELD-TYPE VARIABLES
  let editType = false;

  $: editMode =
    editFieldName ||
    editSerial ||
    editIncrement ||
    editRecordsPerIncrement ||
    editPad ||
    editPrefix ||
    editSuffix ||
    editType;

  $: saveButtonDisabled =
    !changeMade ||
    !validFieldName ||
    !validSerial ||
    !validIncrement ||
    !validRecordsPerIncrement ||
    !validPadLength;

  // FUNCTIONS
  function hideEditPanel(e) {
    e.preventDefault();
    // - PROMPT USER THAT ANY UNSAVED CHANGES WILL BE LOST FIRST
    editPanelVisible = false;
  }

  function saveAndUpdate(e) {
    e.preventDefault();
    fieldsClone[index] = fieldClone;
    editPanelVisible = false;
  }
</script>

<PopUp header="Edit Fields">
  <EditFieldButtons
    bind:fieldClone
    bind:field
    bind:validFieldName
    bind:validSerial
    bind:validIncrement
    bind:validRecordsPerIncrement
    bind:validPadLength
    bind:editFieldName
    bind:editSerial
    bind:editIncrement
    bind:editRecordsPerIncrement
    bind:editPad
    bind:editPrefix
    bind:editSuffix
    bind:editType
    {editMode}
  />

  {#if !editMode}
    <div id="button-block">
      <button on:click={hideEditPanel}>CANCEL & CLOSE</button>
      <button disabled={saveButtonDisabled} on:click={saveAndUpdate}
        >SAVE & UPDATE</button
      >
    </div>
  {/if}
</PopUp>

<style>
  #button-block {
    margin: auto;
    margin-top: 15px;
    /* border-style: solid; */
    border-color: blue;
    box-sizing: border-box;
  }
</style>