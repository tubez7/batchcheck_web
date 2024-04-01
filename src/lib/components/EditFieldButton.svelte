<script>
  export let fieldClone;
  export let fieldId;
  export let value;
  export let editFieldName;
  export let editSerial;

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
    }
    if (fieldToEdit === "serial") {
      editSerial = true;
      editFieldName = false;
    }
  }
</script>

<button on:click={() => viewEditField(value)}
  >{fieldId}: {displayValueText}</button
>
