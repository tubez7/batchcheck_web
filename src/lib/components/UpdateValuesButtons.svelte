<script>
  // PROPS
  export let field;
  export let fieldClone;
  export let value;
  export let fieldToEditName;
  export let editFieldName;
  export let validCheck;

  // FUNCTIONS
  function saveField(fieldToSave) {
    fieldClone[fieldToSave] = value;
    if (fieldToSave === "name") {
      editFieldName = false;
    }
  }

  function cancelChange(fieldToCancel) {
    if (fieldToCancel === "name") {
      editFieldName = false;
    }
  }

  function resetField(fieldToReset) {
    fieldClone[fieldToReset] = field[fieldToReset];
    if (fieldToReset === "name") {
      editFieldName = false;
    }
  }
</script>

<button on:click={() => saveField(fieldToEditName)} disabled={!validCheck}
  >SAVE CHANGES</button
>
<button on:click={() => cancelChange(fieldToEditName)}>CANCEL & CLOSE</button>
<button on:click={() => resetField(fieldToEditName)}>RESET ALL CHANGES</button>
