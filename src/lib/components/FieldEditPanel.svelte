<script>
  // IMPORTS
  import { compareEquality } from "$lib/utils.js";

  // COMPONENTS
  import EditField from "$lib/components/EditField.svelte";
  import EditFieldButtons from "$lib/components/EditFieldButtons.svelte";
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import WarningAlert from "$lib/components/WarningAlert.svelte";

  // PROPS
  export let editPanelVisible;
  export let fieldsClone;
  export let field;
  export let index;
  export let warningPopUpVisible;

  // VARIABLES
  let fieldClone = { ...field };
  $: changeMade = !compareEquality(field, fieldClone);
  let headerText;

  // ALERT VARIABLES
  let alert = "Any unsaved changes will be permanently lost.";
  let userConfirmation = false;

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
  $: hasSerial = !editSerial ? fieldClone.hasSerial : hasSerial;

  // PAD VARIABLES
  let validPadLength = true;
  let editPad = false;

  // PREFIX/SUFFIX VARIABLES
  let editPrefix = false;
  let editSuffix = false;

  // FIELD-TYPE VARIABLES
  let editType = false;
  $: standardField =
    fieldClone.type !== "Composite QR" && fieldClone.type !== "Composite-scan";

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
  function userConfirmed(confirmation) {
    if (confirmation) {
      editPanelVisible = false;
    }
    userConfirmation = false;
  }

  function setDefaults() {
    fieldClone.hasSerial = false;
    fieldClone.serial = null;
    fieldClone.incrementValue = 0;
    fieldClone.recordsPerIncrement = 1;
    fieldClone.serialPadded = false;
    fieldClone.padLength = null;
    fieldClone.padLead = "";
    fieldClone.padTrail = "";
    fieldClone.prefix = "";
    fieldClone.suffix = "";
  }

  function hideEditPanel(e) {
    e.preventDefault();
    changeMade ? (warningPopUpVisible = true) : (editPanelVisible = false);
  }

  function saveAndUpdate(e) {
    e.preventDefault();
    if (!standardField) {
      setDefaults();
    }
    fieldsClone[index] = fieldClone;
    editPanelVisible = false;
  }

  $: userConfirmation, userConfirmed(userConfirmation);
</script>

{#if !editMode}
  {#if !warningPopUpVisible}
    <PopUp header="Edit Fields">
      <EditFieldButtons
        bind:fieldClone
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:headerText
        {hasSerial}
        {standardField}
      />

      <FieldItemStyle>
        <button on:click={hideEditPanel}>CANCEL & CLOSE</button>
        <button
          id="save-button"
          disabled={saveButtonDisabled}
          on:click={saveAndUpdate}>SAVE & UPDATE</button
        >
      </FieldItemStyle>
    </PopUp>
  {/if}

  {#if warningPopUpVisible}
    <PopUp --colour="rgb(250, 128, 128)" header="WARNING!">
      <WarningAlert bind:warningPopUpVisible bind:userConfirmation {alert} />
    </PopUp>
  {/if}
{/if}

{#if editMode}
  <PopUp
    --colour="aquamarine"
    header={headerText}
    subHeader="(* denotes a mandatory field)"
  >
    <EditField
      bind:field
      bind:fieldClone
      bind:editFieldName
      bind:validFieldName
      bind:editSerial
      bind:validSerial
      bind:editIncrement
      bind:validIncrement
      bind:editRecordsPerIncrement
      bind:validRecordsPerIncrement
      bind:editPad
      bind:validPadLength
      bind:editPrefix
      bind:editSuffix
      bind:editType
      {hasSerial}
      {standardField}
    />
  </PopUp>
{/if}

<style>
  button {
    height: 3em;
    width: 10em;
    margin-top: 1em;
  }

  #save-button {
    margin-top: 1em;
  }
</style>
