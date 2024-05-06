<script>
  // COMPONENTS
  import CreateFields from "$lib/components/CreateFields.svelte";
  import EditFields from "$lib/components/EditFields.svelte";
  import FieldEditPanel from "$lib/components/FieldEditPanel.svelte";
  import SetRecords from "$lib/components/SetRecords.svelte";

  // VARIABLES
  let fields = [];
  let fieldsClone = [];
  let records = 1;
  $: formValidated = fields.length > 0 && records > 0;
  let editPanelVisible = false;
  let indexToEdit = 0;
  let fieldToEdit = {};
  let editMode = false;

  // FUNCTIONS
  // function resetData(e) {
  //   // trigger warning here before executing
  //   e.preventDefault();
  //   records = 1;
  //   fields = [];
  // }

  function toggleEditMode(e) {
    e.preventDefault();
    editMode = !editMode;
    fieldsClone = [...fields];
  }

  // DEBUG WATCHERS
  // $: console.log("Records = ", records);
  // $: console.log("Fields = ", fields);
  // $: console.log("formValidated = ", formValidated);
  // $: console.log("indexToEdit = ", indexToEdit);
  //$: console.log("fieldToEdit = ", fieldToEdit);
</script>

<fieldset id="data-generator-box">
  <legend>Batch-Check Constructor</legend>
  <p>NB - * denotes a mandatory field</p>

  <div id="container">
    <div id="left">
      <form>
        <SetRecords bind:records />
        <CreateFields bind:fields />
      </form>
      <button disabled={!formValidated}>GENERATE BATCH_CHECK TABLE</button>
      <button on:click={toggleEditMode}
        >{editMode ? "CREATE FIELD MODE" : "EDIT FIELD MODE"}</button
      >
    </div>

    <div id="right">
      <EditFields
        bind:fields
        bind:indexToEdit
        bind:fieldToEdit
        bind:editPanelVisible
        {fieldsClone}
        {records}
        {editMode}
      />
    </div>
  </div>
</fieldset>

{#if editMode}
  {#if editPanelVisible}
    <FieldEditPanel
      bind:fields
      bind:editPanelVisible
      field={fieldToEdit}
      index={indexToEdit}
    />
  {/if}
{/if}

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

  #data-generator-box {
    background-color: beige;
  }
</style>
