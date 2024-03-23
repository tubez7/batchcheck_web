<script>
  // COMPONENTS
  import FieldCard from "$lib/components/FieldCard.svelte";

  // PROPS
  export let fields;
  export let records;
</script>

{#if fields.length > 0}
  <div>
    <h2>EDIT BATCH-CHECK TABLE</h2>
    <h3>NUMBER OF BATCHES/RECORDS: {records}</h3>

    {#each fields as field, i}
      <FieldCard bind:fields {field} index={i} />
    {/each}
  </div>
{/if}
