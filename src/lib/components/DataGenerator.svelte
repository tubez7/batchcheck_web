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

  <div id="container">
    <div id="left">
      <form>
        <SetRecords bind:records />
        <CreateFields bind:fields />
      </form>
    </div>

    <div id="right">
      <FieldsEdit bind:fields {records} />
    </div>
  </div>

  <button disabled={!formValidated}>GENERATE BATCH_CHECK TABLE</button>
  {#if fields.length > 0}
    <button on:click={resetData} type="reset">RESET ALL</button>
  {/if}
</fieldset>

<style>
  #container {
    display: flex;
    flex-direction: row;
  }

  #left {
    flex: 1;
    max-width: 50%;
  }

  #right {
    flex: 1;
    max-width: 50%;
  }
</style>
