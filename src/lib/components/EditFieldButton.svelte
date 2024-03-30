<script>
  export let fieldId;
  export let value;
  export let editFieldName;

  function viewEditField(fieldToEdit) {
    if (fieldToEdit === "Field Name") {
      editFieldName = true;
    }
  }
</script>

<button on:click={() => viewEditField(fieldId)}>{fieldId}: {value}</button>
