<script>
  // IMPORTS
  import { compareEquality } from "$lib/utils.js";

  // COMPONENTS
  import FieldItem from "$lib/components/FieldItem.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";
  import SetSeparator from "$lib/components/SetSeparator.svelte";
  import ValueCard from "$lib/components/ValueCard.svelte";

  // PROPS
  export let createComposite;
  export let compositeField;
  export let fields;
  export let index;

  // VARIABLES
  let regularFields = fields.filter(
    (field) => !field.type.includes("Composite")
  );

  let editSeparator = false;
  let compositeData = compositeField.compositeData;
  let separator = compositeField.compositeSeparator;
  let separatorReference = separator;
  let compositeDataClone = [...compositeData];
  $: changeMade =
    !compareEquality(compositeData, compositeDataClone) ||
    separator !== separatorReference;

  // FUNCTIONS
  function handleClose(e) {
    e.preventDefault();
    createComposite = false;
  }

  function handleSave(e) {
    e.preventDefault();
    // CALL setNewSortOrder() HERE -> compositeData = setNewSortOrder(compositeData)
    compositeField.compositeData = compositeData; // USE METHOD IF POSSIBLE
    compositeField.compositeSeparator = separator;
    fields[index] = compositeField;
    createComposite = false;
  }
</script>

<div id="composite-field-edit">
  <h3>COMPOSITE DATA CREATOR</h3>
  <p>Field Name: {compositeField.name}</p>

  <SetSeparator bind:separator bind:editSeparator />

  <div id="left">
    <h4>CONCATENATE FIELD DATA</h4>
    <div class="box">
      {#each regularFields as regularField}
        <FieldItem bind:compositeData field={regularField} />
      {/each}
    </div>
  </div>

  <div id="right">
    <h4>COMPOSITE DATA VALUE</h4>
    {#if compositeData.length > 0}
      <FieldsSort bind:compositeData editMode={true} fields={null} />
    {/if}
    <div class="box">
      {#each compositeData as value, i}
        <ValueCard {...value} bind:compositeData index={i} />
      {/each}
    </div>
  </div>
  {#if !editSeparator}
    <button on:click={handleClose}>CANCEL & CLOSE</button>
    <button on:click={handleSave} disabled={!changeMade}>SAVE CHANGES</button>
  {/if}
</div>

<style>
  .box {
    border-style: solid;
  }
</style>
