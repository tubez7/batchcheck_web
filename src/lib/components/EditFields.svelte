<script>
  // COMPONENTS
  import FieldCard from "$lib/components/FieldCard.svelte";

  // PROPS
  export let fields;
  export let records;
  export let indexToEdit;
  export let fieldToEdit;
  export let editPanelVisible;
</script>

<div>
  <fieldset id="edit-field-box">
    <h2>FIELD EDITOR</h2>
    <h3>NUMBER OF BATCHES/RECORDS: {records}</h3>

    {#if fields.length > 0}
      <fieldset id="card-box">
        {#each fields as field, i}
          <FieldCard
            bind:fields
            bind:indexToEdit
            bind:fieldToEdit
            bind:editPanelVisible
            {field}
            index={i}
          />
        {/each}
      </fieldset>
    {/if}
  </fieldset>
</div>

<style>
  #edit-field-box {
    background-color:rgb(225, 184, 251);
  }

  #card-box {
    background-color:rgb(194, 203, 244);
  }
</style>
