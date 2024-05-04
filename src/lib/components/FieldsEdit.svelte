<script>
  // COMPONENTS
  import FieldCard from "$lib/components/FieldCard.svelte";

  // PROPS
  export let fields;
  export let records;
</script>

<div>
  <fieldset>
    <h2>EDIT FIELDS</h2>
    <h3>NUMBER OF BATCHES/RECORDS: {records}</h3>

    {#if fields.length > 0}
      <fieldset>
        {#each fields as field, i}
          <FieldCard bind:fields {field} index={i} />
        {/each}
      </fieldset>
    {/if}
  </fieldset>
</div>
