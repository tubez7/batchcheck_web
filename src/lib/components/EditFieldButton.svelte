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
  export let editType;

  // VARIABLES
  let displayValueText;
  let padText;

  if (fieldId === "Serial") {
    if (!fieldClone.hasSerial) {
      displayValueText = "None";
    } else {
      displayValueText = fieldClone[value]?.toString() || "0";
    }
  } else if (fieldId === "Serial Padded") {
    padText = fieldClone.padTrail
      ? `Trail pad char (${fieldClone.padTrail})`
      : fieldClone.padLead
        ? `Lead pad char (${fieldClone.padLead})`
        : "";
    displayValueText = fieldClone.serialPadded
      ? "Pad Length = " + fieldClone.padLength + ": " + padText
      : "N/A";
  } else if (fieldId === "Prefix" || fieldId === "Suffix") {
    displayValueText = fieldClone[value] === "" ? "None" : fieldClone[value];
  } else {
    displayValueText = fieldClone[value];
  }

  // FUNCTIONS
  function setValuesToFalse() {
    editFieldName = false;
    editSerial = false;
    editIncrement = false;
    editRecordsPerIncrement = false;
    editPad = false;
    editPrefix = false;
    editSuffix = false;
    editType = false;
  }

  function viewEditField(fieldToEdit) {
    setValuesToFalse();
    if (fieldToEdit === "name") {
      editFieldName = true;
    } else if (fieldToEdit === "serial") {
      editSerial = true;
    } else if (fieldToEdit === "incrementValue") {
      editIncrement = true;
    } else if (fieldToEdit === "recordsPerIncrement") {
      editRecordsPerIncrement = true;
    } else if (fieldToEdit === "serialPadded") {
      editPad = true;
    } else if (fieldToEdit === "prefix") {
      editPrefix = true;
    } else if (fieldToEdit === "suffix") {
      editSuffix = true;
    } else if (fieldToEdit === "type") {
      editType = true;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    viewEditField(value);
  }
</script>

<button on:click={handleClick}>{fieldId}: {displayValueText}</button>
