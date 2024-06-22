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
  export let headerText;

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
      headerText = "Edit Field Name";
    } else if (fieldToEdit === "serial") {
      editSerial = true;
      headerText = "Edit Serial Number";
    } else if (fieldToEdit === "incrementValue") {
      editIncrement = true;
      headerText = "Edit Increment Value";
    } else if (fieldToEdit === "recordsPerIncrement") {
      editRecordsPerIncrement = true;
      headerText = "Edit Records Per Increment";
    } else if (fieldToEdit === "serialPadded") {
      editPad = true;
      headerText = "Edit Serial Pad";
    } else if (fieldToEdit === "prefix") {
      editPrefix = true;
      headerText = "Edit Prefix";
    } else if (fieldToEdit === "suffix") {
      editSuffix = true;
      headerText = "Edit Suffix";
    } else if (fieldToEdit === "type") {
      editType = true;
      headerText = "Edit Field Type";
    }
  }

  function handleClick(e) {
    e.preventDefault();
    viewEditField(value);
  }
</script>

<span id="container">
  <span><span id="field-id">{fieldId}: </span>{displayValueText}</span>
  <button on:click={handleClick}>Edit</button>
</span>

<style>
  #container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.125em;
    margin-bottom: 0.125em;
    padding: 2px;
    padding-right: 5px;
    align-items: stretch;
    border-style: solid;
    border-color: cyan;
    background-color: rgb(241, 237, 237);
    box-sizing: border-box;
  }

  #field-id {
    font-weight: bolder;
  }
</style>
