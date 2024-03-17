<script>
  import FieldEditPanel from "$lib/components/FieldEditPanel.svelte";

  export let fields;
  export let field;
  export let editPanelVisible;
  export let index;

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
  FIELD SERIAL: {field.serial}
  <br />
  SERIAL INCREMENT VAL: {field.incrementValue}
  <br />
  SERIAL RECORDS PER INCREMENT: {field.recordsPerIncrement}
  <br />
  SERIAL HAS PAD: {field.padded}
  <br />
  SERIAL PAD LENGTH: {field.padLength}
  <br />
  SERIAL PAD LEAD CHAR: {field.padLead}
  <br />
  SERIAL PAD TRAIL CHAR: {field.padTrail}
  <br />
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
  <FieldEditPanel bind:fields bind:editPanelVisible {field} {index} />
{/if}
