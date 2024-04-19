<script>
  // COMPONENTS
  import FieldEditPanel from "$lib/components/FieldEditPanel.svelte";

  // PROPS
  export let fields;
  export let field;
  export let index;

  // VARIABLES
  let editPanelVisible = false;

  // FUNCTIONS
  function showEditPanel(e) {
    e.preventDefault();
    editPanelVisible = true;
  }
</script>

<div>
  FIELD NUMBER: {field.fieldNumber}
  <br />
  FIELD NAME: {field.name}
  <br />
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
{#if editPanelVisible}
  <FieldEditPanel bind:fields bind:editPanelVisible bind:field {index} />
{/if}
