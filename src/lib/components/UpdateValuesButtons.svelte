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
  function cancelChange(fieldToCancel) {
    if (fieldToCancel === "name") {
      editFieldName = false;
    } else if (fieldToCancel === "serial") {
      editSerial = false;
    } else if (fieldToCancel === "incrementValue") {
      editIncrement = false;
    }
  }

  function saveField(fieldToSave) {
    fieldClone[fieldToSave] = value;
    if (fieldToSave === "serial") {
      fieldClone.hasSerial = hasSerial;
      if (!hasSerial) {
        fieldClone.serial = null;
      }
    }
    changeMade = true;
    cancelChange(fieldToSave);
  }

  function resetField(fieldToReset) {
    fieldClone[fieldToReset] = field[fieldToReset];
    if (fieldToReset === "serial") {
      fieldClone.hasSerial = field.hasSerial;
    }
    cancelChange(fieldToReset);
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

<button on:click={handleSave} disabled={!validCheck}>SAVE CHANGES</button>
<button on:click={handleCancel}>CANCEL & CLOSE</button>
<button on:click={handleReset}>RESET TO ORIGINAL VALUE</button>
