<script>
  // PROPS
  export let field;
  export let fieldClone;
  export let value;
  export let fieldToEditName;
  export let changeMade;
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
    }
  }

  function saveField(fieldToSave) {
    fieldClone[fieldToSave] = value;
    if (fieldToSave === "serial") {
      fieldClone.hasSerial = hasSerial;
      if (!hasSerial) {
        fieldClone.serial = null;
      }
    } else if (fieldToSave === "padLength") {
      fieldClone.serialPadded = serialPadded;
      fieldClone.padLead = padLead;
      fieldClone.padTrail = padTrail;
    }
    changeMade = true;
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

<button on:click={handleSave} disabled={!validCheck}>SAVE CHANGES</button>
<button on:click={handleCancel}>CANCEL & CLOSE</button>
<button on:click={handleReset}>RESET TO ORIGINAL VALUE</button>
