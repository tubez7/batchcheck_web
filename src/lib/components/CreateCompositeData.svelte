<script>
  // IMPORTS
  import { compareEquality, setNewSortOrder } from "$lib/utils.js";

  // COMPONENTS
  import FieldItem from "$lib/components/FieldItem.svelte";
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
  import FieldsSort from "$lib/components/FieldsSort.svelte";
  import SetSeparator from "$lib/components/SetSeparator.svelte";
  import TwoButtons from "$lib/components/TwoButtons.svelte";
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

<FieldsetStyle
  --colour="rgb(194, 169, 41)"
  --margin-top="0"
  --padding="0.3em"
  --background="rgb(250, 227, 125)"
>
  <div class="header-block">
    <h4>Field Data</h4>
    <h4>Field Value</h4>
  </div>

  <div class="block">
    <div class="divider" id="left">
      <div class="scroll-bar">
        {#each regularFields as regularField}
          <FieldItem bind:compositeData field={regularField} />
        {/each}
      </div>
    </div>

    <div class="divider" id="right">
      <div class="scroll-bar">
        {#each compositeData as value, i}
          <ValueCard name={value.name} bind:compositeData index={i} />
        {/each}
      </div>
    </div>
  </div>

  <FieldsSort bind:compositeData editMode={true} fieldsClone={null} />
</FieldsetStyle>

<SetSeparator bind:separator bind:editSeparator />

{#if !editSeparator}
  <div class="button-block">
    <TwoButtons
      --hover1="rgb(66, 237, 180)"
      --hover2="rgb(250, 128, 128)"
      callbackFunc1={handleSave}
      callbackFunc2={handleClose}
      button1text="SAVE CHANGES"
      button2text="CANCEL & CLOSE"
      disableButton1={!changeMade}
      disableButton2={false}
      type1="submit"
      type2="reset"
    />
  </div>
{/if}

<style>
  .block {
    display: flex;
    justify-content: space-between;
    min-width: 40em;
  }

  .divider {
    width: 50%;
    text-align: center;
    background-color: rgb(214, 193, 99);
    border-style: solid;
    border-color: rgb(194, 169, 41);
    border-radius: 1em;
    box-sizing: border-box;
    margin-bottom: 0.25em;
  }

  /* media query on container max height. current value for small screen */
  .scroll-bar {
    max-height: 12em;
    overflow: auto;
  }

  #left {
    margin-right: 0.2em;
    padding-right: 0.5em;
  }

  #right {
    margin-left: 0.2em;
    padding-right: 0.5em;
  }

  .header-block {
    display: flex;
    justify-content: space-around;
    min-width: 35em;
    margin-bottom: 0;
    margin-top: 0;
  }

  .button-block {
    text-align: center;
  }

  ::-webkit-scrollbar {
    width: 0.5em;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(112, 97, 22);
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(156, 135, 30);
    border-radius: 1em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(112, 97, 22);
  }
</style>
