<script>
  // COMPONENTS
  import FieldCard from "$lib/components/FieldCard.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";

  // PROPS
  export let fields;
  export let fieldsClone;
  export let records;
  export let indexToEdit;
  export let fieldToEdit;
  export let editPanelVisible;
  export let editMode;

  // VARIABLES
  $: opaqueOverlay = editMode ? "edit" : "create";
</script>

<div id={opaqueOverlay}>
  <fieldset id="edit-field-box">
    <h2>FIELD EDITOR</h2>
    <h3>NUMBER OF BATCHES/RECORDS: {records}</h3>

    <FieldsSort bind:fields {fieldsClone} {editMode} />

    {#if fields.length > 0}
      <fieldset id="card-box">
        {#each fields as field, i}
          <FieldCard
            bind:fields
            bind:indexToEdit
            bind:fieldToEdit
            bind:editPanelVisible
            {field}
            {editMode}
            index={i}
          />
        {/each}
      </fieldset>
    {/if}
  </fieldset>
</div>

<style>
  #edit {
    background-color: rgb(225, 184, 251);
  }

  #create {
    background-color: rgb(98, 83, 107);
    opacity: 0.5;
  }

  #card-box {
    background-color: rgb(194, 203, 244);
  }
</style>
