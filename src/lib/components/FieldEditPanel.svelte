<script>
  // IMPORTS
  import { regex } from "$lib/fieldVariables.js";

  // PROPS
  export let editPanelVisible;
  export let fields;
  export let field;
  export let index;

  console.log(fields, index); //to prevent prop error whilst not being utilised

  // VARIABLES
  const fieldClone = { ...field };
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

  $: validFieldName = !fieldName.length < 1 && regex.test(fieldName);
  let editFieldName = false;

  $: saveButtonDisabled = !validFieldName;


  // FUNCTIONS
  function hideEditPanel(e) {
    e.preventDefault();
    // - PROMPT USER THAT ANY UNSAVED CHANGES WILL BE LOST FIRST
    editPanelVisible = false;
  }

  function viewEditField(fieldToEdit) {
    if (fieldToEdit === "name") {
      editFieldName = true;
    }
  }

  function saveField(fieldToSave) {
    if (fieldToSave === "name") {
      fieldClone.name = fieldName;
      editFieldName = false;
    }
  }

  function cancelChange(fieldToCancel) {
    if (fieldToCancel === "name") {
      fieldName = fieldClone.name;
      editFieldName = false;
    }
  }

  function resetField(fieldToReset) {
    if (fieldToReset === "name") {
      fieldName = field.name;
      editFieldName = false;
    }
  }
</script>

<br />
<br />
<div id="field-edit-popup">
  {#if !editFieldName}
    <button on:click={() => viewEditField("name")}
      >fieldName: {fieldName}</button
    >
  {/if}
  {#if editFieldName}
    <input
      bind:value={fieldName}
      type="text"
      id="field"
      placeholder="Enter the field/column name"
    />
    {#if !validFieldName}
      <p>Field Name is a mandatory field</p>
    {/if}
    <button on:click={() => saveField("name")} disabled={!validFieldName}
      >SAVE CHANGES</button
    >
    <button on:click={() => cancelChange("name")}>CANCEL & CLOSE</button>
    <button on:click={() => resetField("name")}>RESET ALL CHANGES</button>
  {/if}
  <p>hasSerial: {hasSerial}</p>
  <p>serial: {serial}</p>
  <p>incrementValue: {incrementValue}</p>
  <p>recordsPerIncrement: {recordsPerIncrement}</p>
  <p>padded: {padded}</p>
  <p>padLength: {padLength}</p>
  <p>padLead: {padLead}</p>
  <p>padTrail: {padTrail}</p>
  <p>prefix: {prefix}</p>
  <p>suffix: {suffix}</p>
  <p>type: {type}</p>
  <p>THIS IS GOING TO BE A POP-UP OVERLAY WITH A Z-INDEX</p>
  <button on:click={hideEditPanel}>CANCEL & CLOSE</button>
  <button disabled={saveButtonDisabled}>SAVE & UPDATE</button>
</div>
<br />
<br />

<style>
  #field-edit-popup {
    border-style: solid;
  }
</style>
