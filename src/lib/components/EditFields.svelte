<script>
  // IMPORTS
  import { compareEquality } from "$lib/utils.js";

  // COMPONENTS
  import CreateCompositeData from "$lib/components/CreateCompositeData.svelte";
  import FieldCard from "$lib/components/FieldCard.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";
  import PopUp from "$lib/components/PopUp.svelte";

  // PROPS
  export let fields;
  export let fieldsClone;
  export let records;
  export let indexToEdit;
  export let fieldToEdit;
  export let editPanelVisible;
  export let editMode;
  export let changeMade;

  // VARIABLES
  $: opaqueOverlay = editMode ? "edit" : "create";
  let createComposite = false;
  let compositeField = {};
  $: changeMade = !compareEquality(fields, fieldsClone);

  // FUNCTIONS
  function handleSave(e) {
    e.preventDefault();
    fields = [...fieldsClone];
    fieldsClone = [...fields];
  }

  function handleCancel(e) {
    e.preventDefault();
    // WARNING HERE
    fieldsClone = [...fields];
  }
</script>

<div id={opaqueOverlay}>
  <fieldset id="edit-field-box">
    <h2>FIELD EDITOR</h2>
    <h3>NUMBER OF BATCHES/RECORDS: {records}</h3>

    {#if fieldsClone.length < 1 && editMode}
      <p>NO FIELD DATA TO EDIT</p>
    {/if}

    {#if fieldsClone.length > 0}
      <FieldsSort bind:fieldsClone {editMode} compositeData={null} />

      <fieldset id="card-box">
        {#each fieldsClone as field, i}
          <FieldCard
            bind:fieldsClone
            bind:indexToEdit
            bind:fieldToEdit
            bind:editPanelVisible
            bind:createComposite
            bind:compositeField
            {field}
            {editMode}
            index={i}
          />
        {/each}
      </fieldset>
    {/if}
    {#if editMode}
      <button on:click={handleSave} disabled={!changeMade}>SAVE & UPDATE</button
      >
      <button on:click={handleCancel} disabled={!changeMade}
        >RESET CHANGES</button
      >
    {/if}
  </fieldset>
</div>

{#if createComposite}
  <PopUp --colour="cyan">
    <CreateCompositeData
      bind:createComposite
      bind:fieldsClone
      {compositeField}
      index={indexToEdit}
    />
  </PopUp>
{/if}

<style>
  #edit {
    background-color: rgb(225, 184, 251);
  }

  #create {
    background-color: rgb(98, 83, 107);
    opacity: 0.5;
  }

  #card-box {
    background-color: rgb(194, 203, 244);
  }
</style>
