<script>
  // PROPS
  export let fieldClone;
  export let fieldId;
  export let value;
  export let editFieldName;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let editPad;
  export let editPrefix;
  export let editSuffix;

  // VARIABLES
  let displayValueText;

  if (fieldId === "Serial") {
    if (!fieldClone.hasSerial) {
      displayValueText = "None";
    } else {
      displayValueText = fieldClone[value]?.toString() || "0";
    }
  } else if (fieldId === "Prefix" || fieldId === "Suffix") {
    displayValueText = fieldClone[value] === "" ? "None" : fieldClone[value];
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
      editPad = false;
      editPrefix = false;
      editSuffix = false;
    } else if (fieldToEdit === "serial") {
      editSerial = true;
      editFieldName = false;
      editIncrement = false;
      editRecordsPerIncrement = false;
      editPad = false;
      editPrefix = false;
      editSuffix = false;
    } else if (fieldToEdit === "incrementValue") {
      editIncrement = true;
      editFieldName = false;
      editSerial = false;
      editRecordsPerIncrement = false;
      editPad = false;
      editPrefix = false;
      editSuffix = false;
    } else if (fieldToEdit === "recordsPerIncrement") {
      editRecordsPerIncrement = true;
      editFieldName = false;
      editSerial = false;
      editIncrement = false;
      editPad = false;
      editPrefix = false;
      editSuffix = false;
    } else if (fieldToEdit === "serialPadded") {
      editPad = true;
      editRecordsPerIncrement = false;
      editFieldName = false;
      editSerial = false;
      editIncrement = false;
      editPrefix = false;
      editSuffix = false;
    } else if (fieldToEdit === "prefix") {
      editPrefix = true;
      editRecordsPerIncrement = false;
      editFieldName = false;
      editSerial = false;
      editIncrement = false;
      editPad = false;
      editSuffix = false;
    } else if (fieldToEdit === "suffix") {
      editSuffix = true;
      editRecordsPerIncrement = false;
      editFieldName = false;
      editSerial = false;
      editIncrement = false;
      editPad = false;
      editPrefix = false;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    viewEditField(value);
  }
</script>

<button on:click={handleClick}>{fieldId}: {displayValueText}</button>
