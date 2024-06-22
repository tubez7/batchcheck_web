<script>
  // IMPORTS
  import { onMount } from "svelte";

  // COMPONENTS
  import EditField from "$lib/components/EditField.svelte";
  import EditFieldButton from "$lib/components/EditFieldButton.svelte";

  // PROPS
  export let field;
  export let fieldClone;
  export let validFieldName;
  export let editFieldName;
  export let validSerial;
  export let editSerial;
  export let validIncrement;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let validRecordsPerIncrement;
  export let validPadLength;
  export let editPad;
  export let editPrefix;
  export let editSuffix;
  export let editType;
  export let editMode;

  // VARIABLES
  let initialised = false;
  let headerText;

  // SERIAL VARIABLES
  $: hasSerial = !editSerial ? fieldClone.hasSerial : hasSerial;
  $: standardField =
    fieldClone.type !== "Composite QR" && fieldClone.type !== "Composite-scan";

  // FUNCTIONS
  function setDefaults() {
    if (initialised) {
      console.log("setDefaults called IN EDIT FIELD");
      fieldClone.hasSerial = false;
      fieldClone.serial = null;
      fieldClone.incrementValue = 0;
      fieldClone.recordsPerIncrement = 1;
      fieldClone.serialPadded = false;
      fieldClone.padLength = null;
      fieldClone.padLead = "";
      fieldClone.padTrail = "";
      fieldClone.prefix = "";
      fieldClone.suffix = "";
    }
  }
  $: standardField, setDefaults();

  onMount(() => {
    initialised = true;
    console.log("Mounted EDIT FIELD");
  });
</script>

<div id="button-block">
  {#if !editMode}
    <EditFieldButton
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:headerText
      {fieldClone}
      fieldId="Field Name"
      value="name"
    />
    {#if standardField}
      <EditFieldButton
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:headerText
        {fieldClone}
        fieldId="Serial"
        value="serial"
      />
      {#if hasSerial}
        <EditFieldButton
          bind:editFieldName
          bind:editSerial
          bind:editIncrement
          bind:editRecordsPerIncrement
          bind:editPad
          bind:editPrefix
          bind:editSuffix
          bind:editType
          bind:headerText
          {fieldClone}
          fieldId="Increment serial by"
          value="incrementValue"
        />

        <EditFieldButton
          bind:editFieldName
          bind:editSerial
          bind:editIncrement
          bind:editRecordsPerIncrement
          bind:editPad
          bind:editPrefix
          bind:editSuffix
          bind:editType
          bind:headerText
          {fieldClone}
          fieldId="Records Per Increment"
          value="recordsPerIncrement"
        />

        <EditFieldButton
          bind:editFieldName
          bind:editSerial
          bind:editIncrement
          bind:editRecordsPerIncrement
          bind:editPad
          bind:editPrefix
          bind:editSuffix
          bind:editType
          bind:headerText
          {fieldClone}
          fieldId="Serial Padded"
          value="serialPadded"
        />
      {/if}
      <EditFieldButton
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:headerText
        {fieldClone}
        fieldId="Prefix"
        value="prefix"
      />

      <EditFieldButton
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:headerText
        {fieldClone}
        fieldId="Suffix"
        value="suffix"
      />
    {/if}
    <EditFieldButton
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:headerText
      {fieldClone}
      fieldId="Field Type"
      value="type"
    />
  {/if}
</div>

{#if editMode}
  <EditField
    bind:field
    bind:fieldClone
    bind:editFieldName
    bind:validFieldName
    bind:editSerial
    bind:validSerial
    bind:editIncrement
    bind:validIncrement
    bind:editRecordsPerIncrement
    bind:validRecordsPerIncrement
    bind:editPad
    bind:validPadLength
    bind:editPrefix
    bind:editSuffix
    bind:editType
    {headerText}
    {hasSerial}
    {standardField}
  />
{/if}

<style>
  #button-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    /* border-style: solid; */
    border-color:red;
    box-sizing: border-box;
  }
</style>
