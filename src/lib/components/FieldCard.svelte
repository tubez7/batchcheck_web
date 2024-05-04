<script>
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

  // FUNCTIONS
  function showEditPanel(e) {
    e.preventDefault();
    editPanelVisible = true;
    indexToEdit = index;
    fieldToEdit = field;
  }
  console.log(
    "USING VARIABLE HERE TO PREVENT ERRORING UNTIL NEEDED",
    fields,
    indexToEdit,
    fieldToEdit
  );
</script>

<div>
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
  <button>MOVE UP</button>
  <br />
  <button on:click={showEditPanel}>EDIT FIELD</button>
  <button>DELETE FIELD</button>
  <br />
  <button>MOVE DOWN</button>
</div>
