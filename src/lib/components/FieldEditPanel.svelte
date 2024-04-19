<script>
  // IMPORTS
  import EditFieldButton from "$lib/components/EditFieldButton.svelte";
  import SetFieldName from "$lib/components/SetFieldName.svelte";
  import SetHasSerial from "$lib/components/SetHasSerial.svelte";
  import SetIncrement from "$lib/components/SetIncrement.svelte";
  import SetRecordsPerIncrement from "$lib/components/SetRecordsPerIncrement.svelte";
  import SetSerial from "$lib/components/SetSerial.svelte";
  import SetSerialPadded from "$lib/components/SetSerialPadded.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let editPanelVisible;
  export let fields;
  export let field;
  export let index;

  // VARIABLES
  let fieldClone = { ...field };
  let { serialPadded, padLength, padLead, padTrail, prefix, suffix, type } =
    fieldClone;

  let changeMade = false;

  //FIELD NAME VARIABLES
  let validFieldName = true;
  let editFieldName = false;
  $: fieldName = !editFieldName ? fieldClone.name : fieldName;
  // SERIAL VARIABLES
  let validSerial = true;
  let editSerial = false;
  $: serial = !editSerial ? fieldClone.serial : serial;
  $: hasSerial = !editSerial ? fieldClone.hasSerial : hasSerial;
  let validIncrement = true;
  let editIncrement = false;
  $: incrementValue = !editIncrement
    ? fieldClone.incrementValue
    : incrementValue;
  let editRecordsPerIncrement = false;
  let validRecordsPerIncrement = true;
  $: recordsPerIncrement = !editRecordsPerIncrement
    ? fieldClone.recordsPerIncrement
    : recordsPerIncrement;
  // CONTINUE FROM HERE

  let editPad = false;

  $: editMode =
    editFieldName ||
    editSerial ||
    editIncrement ||
    editRecordsPerIncrement ||
    editPad;

  $: saveButtonDisabled =
    !changeMade ||
    !validFieldName ||
    !validSerial ||
    !validIncrement ||
    !validRecordsPerIncrement;

  // function test() {
  //   console.log(
  //     "validSerial = ",
  //     validSerial,
  //     "validFieldName = ",
  //     validFieldName,
  //     "saveButtonDisabled = ",
  //     saveButtonDisabled
  //   );
  // }

  // FUNCTIONS
  function hideEditPanel(e) {
    e.preventDefault();
    // - PROMPT USER THAT ANY UNSAVED CHANGES WILL BE LOST FIRST
    editPanelVisible = false;
  }

  function saveAndUpdate(e) {
    e.preventDefault();
    fields[index] = fieldClone;
    editPanelVisible = false;
  }
</script>

<br />
<br />
<div id="field-edit-popup">
  <p>THIS IS GOING TO BE A POP-UP OVERLAY WITH A Z-INDEX</p>
  {#if !editMode}
    <EditFieldButton
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      {fieldClone}
      fieldId="Field Name"
      value="name"
    />
  {/if}

  {#if editFieldName}
    <!-- EACH OF THESE WILL BE A POP UP -->
    <SetFieldName bind:fieldName bind:validFieldName />
    <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:changeMade
      {hasSerial}
      value={fieldName}
      validCheck={validFieldName}
      fieldToEditName="name"
    />
  {/if}

  {#if !editMode}
    <EditFieldButton
      bind:editSerial
      bind:editFieldName
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      {fieldClone}
      fieldId="Serial"
      value="serial"
    />
  {/if}

  {#if editSerial}
    <!-- EACH OF THESE WILL BE A POP UP -->
    <SetHasSerial bind:hasSerial />

    {#if hasSerial}
      <SetSerial bind:serial bind:validSerial {hasSerial} />
    {/if}
    
    <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editSerial
      bind:editFieldName
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:changeMade
      {hasSerial}
      value={serial}
      validCheck={validSerial}
      fieldToEditName="serial"
    />
  {/if}

  {#if hasSerial}
    {#if !editMode}
      <EditFieldButton
        bind:editSerial
        bind:editFieldName
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        {fieldClone}
        fieldId="Increment serial by"
        value="incrementValue"
      />
    {/if}

    {#if editIncrement}
      <!-- EACH OF THESE WILL BE A POP UP -->
      <SetIncrement bind:incrementValue bind:validIncrement {hasSerial} />
      <UpdateValuesButtons
        bind:fieldClone
        bind:field
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:changeMade
        {hasSerial}
        value={incrementValue}
        validCheck={validIncrement}
        fieldToEditName="incrementValue"
      />
    {/if}

    {#if !editMode}
      <EditFieldButton
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        {fieldClone}
        fieldId="Records Per Increment"
        value="recordsPerIncrement"
      />
    {/if}

    {#if editRecordsPerIncrement}
      <!-- EACH OF THESE WILL BE A POP UP -->
      <SetRecordsPerIncrement
        bind:recordsPerIncrement
        bind:validRecordsPerIncrement
        {hasSerial}
      />
      <UpdateValuesButtons
        bind:fieldClone
        bind:field
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:changeMade
        {hasSerial}
        value={recordsPerIncrement}
        validCheck={validRecordsPerIncrement}
        fieldToEditName="recordsPerIncrement"
      />
    {/if}

    {#if !editMode}
      <!-- <p>padded: {serialPadded}</p> -->
      <EditFieldButton
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        {fieldClone}
        fieldId="Serial Padded"
        value="serialPadded"
      />
    {/if}

    {#if editPad}
      <SetSerialPadded bind:serialPadded />
    {/if}

    {#if serialPadded}
      <p>padLength: {padLength}</p>
      <p>padLead: {padLead}</p>
      <p>padTrail: {padTrail}</p>
    {/if}
  {/if}
  <p>prefix: {prefix}</p>
  <p>suffix: {suffix}</p>
  <p>type: {type}</p>
  {#if !editFieldName && !editSerial && !editIncrement}
    <button on:click={hideEditPanel}>CANCEL & CLOSE</button>
    <button disabled={saveButtonDisabled} on:click={saveAndUpdate}
      >SAVE & UPDATE</button
    >
  {/if}
</div>
<br />
<br />

<style>
  #field-edit-popup {
    border-style: solid;
  }
</style>
