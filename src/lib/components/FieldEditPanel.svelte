<script>
  // IMPORTS
  import EditFieldButton from "$lib/components/EditFieldButton.svelte";
  import SetFieldName from "$lib/components/SetFieldName.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";
  import CreateFields from "./CreateFields.svelte";

  // PROPS
  export let editPanelVisible;
  export let fields;
  export let field;
  export let index;

  // VARIABLES
  let fieldClone = { ...field };
  let {
    name: fieldName,
    hasSerial,
    serial,
    incrementValue,
    recordsPerIncrement,
    padded,
    padLength,
    padLead,
    padTrail,
    prefix,
    suffix,
    type,
  } = fieldClone;

  let validFieldName = null;
  let editFieldName = false;
  $: console.log("FIELD-EDIT - validFieldName = ", validFieldName);

  // - CONTINUE HERE - TESTING
  $: validSerial = hasSerial
    ? serial === null || (serial >= 0 && Number.isInteger(serial))
    : true;

  $: saveButtonDisabled = !validFieldName || !validSerial;

  function test() {
    console.log(
      "validSerial = ",
      validSerial,
      "validFieldName = ",
      validFieldName,
      "saveButtonDisabled = ",
      saveButtonDisabled
    );
  }

  // FUNCTIONS
  // function viewEditField(fieldToEdit) {
  //   if (fieldToEdit === "name") {
  //     editFieldName = true;
  //   }
  // }

  // function saveField(fieldToSave) {
  //   if (fieldToSave === "name") {
  //     fieldClone.name = fieldName;
  //     editFieldName = false;
  //   }
  // }

  // function cancelChange(fieldToCancel) {
  //   if (fieldToCancel === "name") {
  //     fieldName = fieldClone.name;
  //     editFieldName = false;
  //   }
  // }

  // function resetField(fieldToReset) {
  //   if (fieldToReset === "name") {
  //     fieldName = field.name;
  //     editFieldName = false;
  //   }
  // }

  function hideEditPanel(e) {
    e.preventDefault();
    // - PROMPT USER THAT ANY UNSAVED CHANGES WILL BE LOST FIRST
    editPanelVisible = false;
  }

  function saveAndUpdate(e) {
    e.preventDefault();
    fields[index] = fieldClone;
    editPanelVisible = false;
  }
</script>

<br />
<br />
<div id="field-edit-popup">
  <p>THIS IS GOING TO BE A POP-UP OVERLAY WITH A Z-INDEX</p>
  {#if !editFieldName}
    <EditFieldButton
      bind:editFieldName
      fieldId="Field Name"
      value={fieldName}
    />
  {/if}
  {#if editFieldName}
    <SetFieldName bind:fieldName bind:validFieldName />
    <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editFieldName
      bind:fieldName
      validCheck={validFieldName}
      fieldToEditName="name"
    />
    <!-- <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editFieldName
      //value={fieldName}
      validCheck={validFieldName}
      fieldToEditName="name"
    /> -->
  {/if}
  <p>hasSerial: {hasSerial}</p>
  <label for="has-serial-edit">Field has Serial#: </label>
  <input bind:checked={hasSerial} type="checkbox" id="has-serial-edit" />
  {#if hasSerial}
    <p>serial: {serial}</p>
    <label for="serial-edit">Serial No#*: </label>
    <input
      bind:value={serial}
      on:input={test}
      type="number"
      inputmode="numeric"
      min="0"
      id="serial-edit"
      placeholder="0"
    />
    <p>incrementValue: {incrementValue}</p>
    <p>recordsPerIncrement: {recordsPerIncrement}</p>
    <p>padded: {padded}</p>
    <p>padLength: {padLength}</p>
    <p>padLead: {padLead}</p>
    <p>padTrail: {padTrail}</p>
  {/if}
  <p>prefix: {prefix}</p>
  <p>suffix: {suffix}</p>
  <p>type: {type}</p>
  <button on:click={hideEditPanel}>CANCEL & CLOSE</button>
  {#if !editFieldName}
    <button disabled={saveButtonDisabled} on:click={saveAndUpdate}
      >SAVE & UPDATE</button
    >
  {/if}
</div>
<br />
<br />

<style>
  #field-edit-popup {
    border-style: solid;
  }
</style>
