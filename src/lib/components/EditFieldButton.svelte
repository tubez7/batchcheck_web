<script>
  // PROPS
  export let fieldClone;
  export let fieldId;
  export let value;
  export let editFieldName;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;

  // VARIABLES
  let displayValueText;

  if (fieldId === "Serial") {
    if (!fieldClone.hasSerial) {
      displayValueText = "None";
    } else {
      displayValueText = fieldClone[value]?.toString() || "0";
    }
  } else {
    displayValueText = fieldClone[value];
  }

  // FUNCTIONS
  function viewEditField(fieldToEdit) {
    if (fieldToEdit === "name") {
      editFieldName = true;
      editSerial = false;
      editIncrement = false;
      editRecordsPerIncrement = false;
    } else if (fieldToEdit === "serial") {
      editSerial = true;
      editFieldName = false;
      editIncrement = false;
      editRecordsPerIncrement = false;
    } else if (fieldToEdit === "incrementValue") {
      editIncrement = true;
      editFieldName = false;
      editSerial = false;
      editRecordsPerIncrement = false;
    } else if (fieldToEdit === "recordsPerIncrement") {
      editRecordsPerIncrement = true;
      editFieldName = false;
      editSerial = false;
      editIncrement = false;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    viewEditField(value);
  }
</script>

<button on:click={handleClick}>{fieldId}: {displayValueText}</button>
