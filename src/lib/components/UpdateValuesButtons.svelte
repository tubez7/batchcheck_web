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
  export let validCheck;

  // FUNCTIONS
  function saveField(fieldToSave) {
    fieldClone[fieldToSave] = value;
    if (fieldToSave === "name") {
      editFieldName = false;
    } else if (fieldToSave === "serial") {
      fieldClone.hasSerial = hasSerial;
      if (!hasSerial) {
        fieldClone.serial = null;
      }
      editSerial = false;
    }
    changeMade = true;
  }

  function cancelChange(fieldToCancel) {
    if (fieldToCancel === "name") {
      editFieldName = false;
    } else if (fieldToCancel === "serial") {
      editSerial = false;
    }
  }

  function resetField(fieldToReset) {
    fieldClone[fieldToReset] = field[fieldToReset];
    if (fieldToReset === "name") {
      editFieldName = false;
    } else if (fieldToReset === "serial") {
      editSerial = false;
      fieldClone.hasSerial = field.hasSerial;
    }
  }
</script>

<button on:click={() => saveField(fieldToEditName)} disabled={!validCheck}
  >SAVE CHANGES</button
>
<button on:click={() => cancelChange(fieldToEditName)}>CANCEL & CLOSE</button>
<button on:click={() => resetField(fieldToEditName)}
  >RESET TO ORIGINAL VALUE</button
>
