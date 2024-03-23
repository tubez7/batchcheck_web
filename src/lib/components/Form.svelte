<script>
  // COMPONENTS
  import CreateFields from "$lib/components/CreateFields.svelte";
  import FieldsEdit from "$lib/components/FieldsEdit.svelte";

  // VARIABLES
  let fields = [];
  let records = 1;
  $: formValidated = fields.length > 0 && records > 0;

  // FUNCTIONS
  function resetFields(e) {
    // trigger warning here before executing
    if (e) {
      e.preventDefault();
    }
    records = 1;
    fields = [];
  }
</script>

<fieldset>
  <legend>Batch-Check Constructor</legend>
  <p>NB - * denotes a mandatory field</p>
  <CreateFields bind:fields bind:records />
  <FieldsEdit bind:fields {records} />
  <button disabled={!formValidated}>GENERATE BATCH_CHECK TABLE</button>
  {#if fields.length > 0}
  <button on:click={resetFields} type="reset">RESET ALL</button>
  {/if}
</fieldset>
