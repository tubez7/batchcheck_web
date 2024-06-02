<script>
  // IMPORTS
  import {
    deleteArrayElement,
    filterCompositeData,
    lowerArrayElement,
    raiseArrayElement,
  } from "../../lib/utils";

  // PROPS
  export let fieldsClone;
  export let field;
  export let index;
  export let indexToEdit;
  export let editPanelVisible;
  export let fieldToEdit;
  export let editMode;
  export let createComposite;
  export let compositeField;

  // VARIABLES
  $: standardField =
    field.type !== "Composite QR" && field.type !== "Composite-scan";
  $: disableUp = index === 0;
  $: disableDown = index === fieldsClone.length - 1;
  $: id = field.id;

  // FUNCTIONS
  function showEditPanel(e) {
    e.preventDefault();
    editPanelVisible = true;
    indexToEdit = index;
    fieldToEdit = { ...field };
  }

  function createCompositeData(e) {
    e.preventDefault();
    createComposite = true;
    compositeField = { ...field };
    indexToEdit = index;
  }

  function moveFieldUp(e) {
    e.preventDefault();
    fieldsClone = raiseArrayElement(fieldsClone, index);
  }

  function moveFieldDown(e) {
    e.preventDefault();
    fieldsClone = lowerArrayElement(fieldsClone, index);
  }

  function deleteField(e) {
    e.preventDefault();
    fieldsClone = filterCompositeData(
      deleteArrayElement(fieldsClone, index),
      id
    );
  }
</script>

<div id="card">
  FIELD ID: {field.id}
  <br />
  FIELD NUMBER: {field.fieldNumber}
  <br />
  INDEX IN FIELDS: {index}
  <br />
  FIELD NAME: {field.name}
  <br />
  {#if standardField}
    FIELD HAS SERIAL: {field.hasSerial}
    <br />
    {#if field.hasSerial}
      FIELD SERIAL: {field.serial}
      <br />
      SERIAL INCREMENT VAL: {field.incrementValue}
      <br />
      SERIAL RECORDS PER INCREMENT: {field.recordsPerIncrement}
      <br />
      SERIAL HAS PAD: {field.serialPadded}
      <br />
      SERIAL PAD LENGTH: {field.padLength}
      <br />
      SERIAL PAD LEAD CHAR: {field.padLead}
      <br />
      SERIAL PAD TRAIL CHAR: {field.padTrail}
      <br />
    {/if}
    FIELD PREFIX: {field.prefix}
    <br />
    FIELD SUFFIX: {field.suffix}
    <br />
  {/if}
  FIELD TYPE: {field.type}
  <br />
  <br />
  {#if editMode}
    <button on:click={moveFieldUp} disabled={disableUp}>MOVE UP</button>
    <br />
    <button on:click={showEditPanel}>EDIT FIELD</button>
    {#if !standardField}
      <button on:click={createCompositeData}>CREATE COMPOSITE FIELD DATA</button
      >
    {/if}
    <button on:click={deleteField}>DELETE FIELD</button>
    <br />
    <button on:click={moveFieldDown} disabled={disableDown}>MOVE DOWN</button>
  {/if}
</div>

<style>
  #card {
    border-style: dotted;
    background-color: pink;
    margin: 0.5em;
  }
</style>
