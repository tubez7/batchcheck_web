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

<!-- <div></div> THIS WILL BE AN OPAQUE BLACK FILTER WHEN POP-UP OPENS -->

<fieldset id="data-generator-box">
  <legend>Batch-Check Constructor</legend>
  <div id="button-block">
    <button disabled={!formValidated}>GENERATE BATCH_CHECK TABLE</button>
    <button on:click={toggleEditMode} disabled={changeMade}
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

{#if editMode}
  {#if editPanelVisible}
    <FieldEditPanel
      bind:fieldsClone
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

  .divider {
    flex: 1;
    max-width: 50%;
  }

  #button-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* #create {
    position: fixed;
    display: block;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: black;
    z-index: 2;
    opacity: 0.7;
    max-width: 50%;
    max-height: 50%;
  }

  #edit {
    position: fixed;
    display: block;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: black;
    z-index: 2;
    opacity: 0.7;
    max-width: 50%;
    max-height: 50%;
  }  */

  #data-generator-box {
    background-color: beige;
  }
</style>
