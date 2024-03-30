<script>
  export let fieldClone;
  export let fieldId;
  export let value;
  export let editFieldName;

  function viewEditField(fieldToEdit) {
    if (fieldToEdit === "name") {
      editFieldName = true;
    }
  }
</script>

<button on:click={() => viewEditField(value)}>{fieldId}: {fieldClone[value]}</button>
