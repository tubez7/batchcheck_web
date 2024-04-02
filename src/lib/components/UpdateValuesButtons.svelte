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
    } else if (fieldToSave === "incrementValue") {
      editIncrement = false;
    }
    changeMade = true;
  }

  function cancelChange(fieldToCancel) {
    if (fieldToCancel === "name") {
      editFieldName = false;
    } else if (fieldToCancel === "serial") {
      editSerial = false;
    } else if (fieldToCancel === "incrementValue") {
      editIncrement = false;
    }
  }

  function resetField(fieldToReset) {
    fieldClone[fieldToReset] = field[fieldToReset];
    if (fieldToReset === "name") {
      editFieldName = false;
    } else if (fieldToReset === "serial") {
      fieldClone.hasSerial = field.hasSerial;
      editSerial = false;
    } else if (fieldToReset === "incrementValue") {
      fieldClone.incrementValue = field.incrementValue;
      editIncrement = false;
    }
  }

  function handleSave(e) {
    e.preventDefault();
    saveField(fieldToEditName);
  }

  function handleCancel(e) {
    e.preventDefault();
    cancelChange(fieldToEditName);
  }

  function handleReset(e) {
    e.preventDefault();
    resetField(fieldToEditName);
  }
</script>

<!-- <button on:click={() => saveField(fieldToEditName)} disabled={!validCheck}
  >SAVE CHANGES</button
>
<button on:click={() => cancelChange(fieldToEditName)}>CANCEL & CLOSE</button>
<button on:click={() => resetField(fieldToEditName)}
  >RESET TO ORIGINAL VALUE</button
> -->

<button on:click={handleSave} disabled={!validCheck}>SAVE CHANGES</button>
<button on:click={handleCancel}>CANCEL & CLOSE</button>
<button on:click={handleReset}>RESET TO ORIGINAL VALUE</button>
