<script>
  // COMPONENTS
  import CreateFields from "$lib/components/CreateFields.svelte";
  import FieldsEdit from "$lib/components/FieldsEdit.svelte";
  import SetRecords from "$lib/components/SetRecords.svelte";

  // VARIABLES
  let fields = [];
  let records = 1;
  $: formValidated = fields.length > 0 && records > 0;

  // FUNCTIONS
  function resetData(e) {
    // trigger warning here before executing
    e.preventDefault();
    records = 1;
    fields = [];
  }

  // DEBUG WATCHERS
  $: console.log("Records = ", records);
  $: console.log("Fields = ", fields);
  $: console.log("formValidated = ", formValidated);
</script>

<fieldset>
  <legend>Batch-Check Constructor</legend>
  <p>NB - * denotes a mandatory field</p>
  <form>
    <fieldset>
      <SetRecords bind:records />
    </fieldset>
    <CreateFields bind:fields />
  </form>
  <FieldsEdit bind:fields {records} />
  <button disabled={!formValidated}>GENERATE BATCH_CHECK TABLE</button>
  {#if fields.length > 0}
    <button on:click={resetData} type="reset">RESET ALL</button>
  {/if}
</fieldset>
