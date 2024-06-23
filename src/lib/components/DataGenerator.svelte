<script>
  // COMPONENTS
  import CreateFields from "$lib/components/CreateFields.svelte";
  import EditFields from "$lib/components/EditFields.svelte";
  import FieldEditPanel from "$lib/components/FieldEditPanel.svelte";
  import SetRecords from "$lib/components/SetRecords.svelte";

  // VARIABLES
  let fields = [];
  let records = 1;
  $: formValidated = fields.length > 0 && records > 0;
  let editPanelVisible = false;
  let indexToEdit = 0;
  let fieldToEdit = {};
  let editMode = false;
  let fieldsClone = [];
  let changeMade = false;
  $: disabled = editMode ? changeMade : fields.length < 1;

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
  }

  // DEBUG WATCHERS
  // $: console.log("Records = ", records);
  //$: console.log("Fields has changed!...", fields);
  //$: console.log("fieldsClone has changed!...", fieldsClone);
  // $: console.log("formValidated = ", formValidated);
  // $: console.log("indexToEdit = ", indexToEdit);
  //$: console.log("fieldToEdit = ", fieldToEdit);
</script>

{#if editPanelVisible}
  <div id="opaque-filter"></div>
{/if}

<fieldset id="data-generator-box">
  <legend>Batch-Check Constructor</legend>
  <div id="button-block">
    <button disabled={!formValidated}>GENERATE BATCH_CHECK TABLE</button>

    <button on:click={toggleEditMode} {disabled}
      >{editMode ? "CREATE FIELD MODE" : "EDIT FIELD MODE"}</button
    >
  </div>
  <p>NB - * denotes a mandatory field</p>

  <div id="container">
    <div class="divider">
      <form>
        <SetRecords bind:records {editMode} />
        <CreateFields bind:fields bind:fieldsClone {editMode} />
      </form>
    </div>

    <div class="divider">
      <EditFields
        bind:fields
        bind:fieldsClone
        bind:indexToEdit
        bind:fieldToEdit
        bind:editPanelVisible
        bind:changeMade
        {records}
        {editMode}
      />
    </div>
  </div>
</fieldset>

{#if editPanelVisible}
  <FieldEditPanel
    bind:fieldsClone
    bind:editPanelVisible
    field={fieldToEdit}
    index={indexToEdit}
  />
{/if}

<style>
  #container {
    display: flex;
    flex-direction: row;
  }

  .divider {
    flex: 1;
    max-width: 50%;
  }

  #button-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #data-generator-box {
    background-color: beige;
  }

  #opaque-filter {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: black;
    filter: opacity(50%);
  }
</style>
