<script>
  // COMPONENTS
  import FieldCard from "$lib/components/FieldCard.svelte";

  // PROPS
  export let fields;
  export let records;
  $: records = records === "" ? 0 : parseInt(records);

  // VARIABLES
  let editPanelVisible = false;

  // FUNCTIONS
  function resetFields(e) {
    if (e) {
      e.preventDefault();
    }
    records = 1;
    fields = [];
  }
</script>

{#if fields.length > 0}
  <div>
    <h2>EDIT BATCH-CHECK TABLE</h2>
    <h3>NUMBER OF BATCHES/RECORDS TO CHECK: {records}</h3>

    {#each fields as field, i}
      <FieldCard {fields} {field} index={i} bind:editPanelVisible />
    {/each}
  </div>
  <button on:click={resetFields} type="reset">RESET ALL FIELDS</button>
{/if}
