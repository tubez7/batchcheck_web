<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";

  // PROPS
  export let field;
  export let fieldClone;
  export let value;
  export let fieldToEditName;
  export let editFieldName;
  export let hasSerial;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let editPad;
  export let serialPadded;
  export let padLead;
  export let padTrail;
  export let validCheck;
  export let editPrefix;
  export let editSuffix;
  export let editType;
  export let minimumPadLength;

  // FUNCTIONS
  function terminateEditMode(fieldToCancel) {
    if (fieldToCancel === "name") {
      editFieldName = false;
    } else if (fieldToCancel === "serial") {
      editSerial = false;
    } else if (fieldToCancel === "incrementValue") {
      editIncrement = false;
    } else if (fieldToCancel === "recordsPerIncrement") {
      editRecordsPerIncrement = false;
    } else if (fieldToCancel === "padLength") {
      editPad = false;
    } else if (fieldToCancel === "prefix") {
      editPrefix = false;
    } else if (fieldToCancel === "suffix") {
      editSuffix = false;
    } else if (fieldToCancel === "type") {
      editType = false;
    }
  }

  function saveField(fieldToSave) {
    if (fieldToSave === "serial") {
      fieldClone.hasSerial = hasSerial;
      fieldClone.serial = hasSerial ? value || 0 : null;
    } else if (fieldToSave === "padLength") {
      fieldClone.padLength = serialPadded ? value || minimumPadLength : null;
      fieldClone.serialPadded = serialPadded;
      fieldClone.padLead = padLead;
      fieldClone.padTrail = padTrail;
    } else {
      fieldClone[fieldToSave] = value;
    }
    terminateEditMode(fieldToSave);
  }

  function resetField(fieldToReset) {
    fieldClone[fieldToReset] = field[fieldToReset];
    if (fieldToReset === "serial") {
      fieldClone.hasSerial = field.hasSerial;
    } else if (fieldToReset === "padLength") {
      fieldClone.serialPadded = field.serialPadded;
      fieldClone.padLead = field.padLead;
      fieldClone.padTrail = field.padTrail;
    }
    terminateEditMode(fieldToReset);
  }

  function handleSave(e) {
    e.preventDefault();
    saveField(fieldToEditName);
  }

  function handleCancel(e) {
    e.preventDefault();
    terminateEditMode(fieldToEditName);
  }

  function handleReset(e) {
    e.preventDefault();
    resetField(fieldToEditName);
  }
</script>

<FieldsetStyle --colour="rgb(114, 113, 113)" --background="rgb(180, 250, 226)">
  <div class="button-block">
    <button id="save" on:click={handleSave} disabled={!validCheck} type="submit"
      >SAVE CHANGES</button
    >
    <button id="close" on:click={handleCancel}>CANCEL & CLOSE</button>
    <button id="reset" on:click={handleReset} type="reset">RESET VALUE</button>
  </div>
</FieldsetStyle>

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
    cursor: pointer;
    box-shadow: 0 5px #999;
  }

  #reset:hover {
    background-color: rgb(250, 128, 128);
  }

  #close:hover {
    background-color: rgb(239, 208, 80);
  }

  #save:hover {
    background-color: rgb(66, 237, 180);
  }

  button:active {
    box-shadow: 0 2px #666;
    transform: translateY(4px);
  }
</style>
