<script>
  // IMPORTS
  import { lowerArrayElement, raiseArrayElement } from "../../lib/utils";
  // PROPS
  export let fields;
  export let field;
  export let index;
  export let indexToEdit;
  export let editPanelVisible;
  export let fieldToEdit;

  // VARIABLES
  $: standardField =
    field.type !== "Composite QR" && field.type !== "Composite-scan";
  $: disableUp = index === 0;
  $: disableDown = index === fields.length - 1;

  // FUNCTIONS
  function showEditPanel(e) {
    e.preventDefault();
    editPanelVisible = true;
    indexToEdit = index;
    fieldToEdit = field;
  }

  function createCompositeData(e) {
    e.preventDefault();
    console.log("CREATE COMPOSITE CLICKED", fields);
  }

  function moveFieldUp(e) {
    e.preventDefault();
    console.log("MOVE UP CLICKED");
    fields = raiseArrayElement(fields, index);
  }

  function moveFieldDown(e) {
    e.preventDefault();
    console.log("MOVE DOWN CLICKED");
    fields = lowerArrayElement(fields, index);
  }
  // console.log(
  //   "USING VARIABLE HERE TO PREVENT ERRORING UNTIL NEEDED",
  //   fields,
  //   indexToEdit,
  //   fieldToEdit
  // );
</script>

<div id="card">
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
  <button on:click={moveFieldUp} disabled={disableUp}>MOVE UP</button>
  <br />
  <button on:click={showEditPanel}>EDIT FIELD</button>
  {#if !standardField}
    <button on:click={createCompositeData}>CREATE COMPOSITE FIELD DATA</button>
  {/if}
  <button>DELETE FIELD</button>
  <br />
  <button on:click={moveFieldDown} disabled={disableDown}>MOVE DOWN</button>
</div>

<style>
  #card {
    border-style: dotted;
    background-color: pink;
    margin: 0.5em;
  }
</style>
