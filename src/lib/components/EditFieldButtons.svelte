<script>
  // COMPONENTS
  import EditFieldButton from "$lib/components/EditFieldButton.svelte";

  // PROPS
  export let fieldClone;
  export let editFieldName;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let editPad;
  export let editPrefix;
  export let editSuffix;
  export let editType;
  export let headerText;
  export let hasSerial;
  export let standardField;
</script>

<div id="button-block">
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
        fieldId="Serial Padded"
        value="serialPadded"
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
</div>

<style>
  #button-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    box-sizing: border-box;
  }
</style>
