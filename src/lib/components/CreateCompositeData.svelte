<script>
  // IMPORTS
  import { compareEquality, setNewSortOrder } from "$lib/utils.js";

  // COMPONENTS
  import FieldItem from "$lib/components/FieldItem.svelte";
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";
  import SetSeparator from "$lib/components/SetSeparator.svelte";
  import ValueCard from "$lib/components/ValueCard.svelte";

  // PROPS
  export let createComposite;
  export let compositeField;
  export let fieldsClone;
  export let index;

  // VARIABLES
  let regularFields = fieldsClone.filter(
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
    compositeData = setNewSortOrder(compositeData);
    compositeField.compositeData = compositeData; // USE METHOD IF POSSIBLE
    compositeField.compositeSeparator = separator;
    fieldsClone[index] = compositeField;
    createComposite = false;
  }
</script>

<div id="composite-field-edit">
  <SetSeparator bind:separator bind:editSeparator />

  <FieldItemStyle>
    <div>
      <h4>CONCATENATE FIELD DATA</h4>
      <div class="box">
        {#each regularFields as regularField}
          <FieldItem bind:compositeData field={regularField} />
        {/each}
      </div>
    </div>

    <div>
      <h4>COMPOSITE DATA VALUE</h4>
      {#if compositeData.length > 0}
        <FieldsSort bind:compositeData editMode={true} fieldsClone={null} />
      {/if}
      <div class="box">
        {#each compositeData as value, i}
          <ValueCard {...value} bind:compositeData index={i} />
        {/each}
      </div>
    </div>
  </FieldItemStyle>
  {#if !editSeparator}
    <div class="button-block">
      <button on:click={handleClose}>CANCEL & CLOSE</button>
      <button on:click={handleSave} disabled={!changeMade}>SAVE CHANGES</button>
    </div>
  {/if}
</div>

<style>
  .box {
    border-style: solid;
  }

  .button-block {
    text-align: center;
  }

  button {
    height: 3em;
    width: 10em;
    margin-top: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
</style>
