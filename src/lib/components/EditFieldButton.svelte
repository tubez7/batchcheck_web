<script>
  // PROPS
  export let fieldClone;
  export let fieldId;
  export let value;
  export let editFieldName;
  export let editSerial;
  export let editIncrement;

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

  function viewEditField(fieldToEdit) {
    if (fieldToEdit === "name") {
      editFieldName = true;
      editSerial = false;
      editIncrement = false;
    } else if (fieldToEdit === "serial") {
      editSerial = true;
      editFieldName = false;
      editIncrement = false;
    } else if (fieldToEdit === "incrementValue") {
      editIncrement = true;
      editSerial = false;
      editFieldName = false;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    viewEditField(value);
  }
</script>

<button on:click={handleClick}>{fieldId}: {displayValueText}</button>
