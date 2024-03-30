<script>
  // PROPS
  export let field;
  export let fieldClone;
  //export let value;
  export let fieldToEditName;
  export let fieldName;
  export let editFieldName;
  export let validCheck;

  // FUNCTIONS
  // function checkVariables(calledWhen) {
  //   console.log("Called ...", calledWhen);
  //   console.log("field = ", field);
  //   console.log("fieldClone = ", fieldClone);
  //   //console.log("value = ", value);
  //   console.log("fieldToEditName = ", fieldToEditName);
  //   console.log("editFieldName = ", editFieldName);
  //   console.log("validCheck = ", validCheck);
  // }

  function saveField(fieldToSave) {
    // checkVariables("saveField click");
    if (fieldToSave === "name") {
      fieldClone.name = fieldName;
      editFieldName = false;
    }
    // checkVariables("saveField after update");
  }

  function cancelChange(fieldToCancel) {
    // checkVariables("cancel click");
    if (fieldToCancel === "name") {
      fieldName = fieldClone.name;
      editFieldName = false;
    }
    // checkVariables("cancel post reset");
  }

  function resetField(fieldToReset) {
    // checkVariables("reset click");
    if (fieldToReset === "name") {
      fieldName = field.name;
      //fieldClone.name = value;
      editFieldName = false;
    }
    // checkVariables("post reset");
  }
</script>

<button on:click={() => saveField(fieldToEditName)} disabled={!validCheck}
    >SAVE CHANGES</button
  >
  <button on:click={() => cancelChange(fieldToEditName)}>CANCEL & CLOSE</button>
  <button on:click={() => resetField(fieldToEditName)}>RESET ALL CHANGES</button>
