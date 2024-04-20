<script>
  // COMPONENTS
  import EditFieldButton from "$lib/components/EditFieldButton.svelte";
  import SetFieldName from "$lib/components/SetFieldName.svelte";
  import SetFieldType from "$lib/components/SetFieldType.svelte";
  import SetHasSerial from "$lib/components/SetHasSerial.svelte";
  import SetIncrement from "$lib/components/SetIncrement.svelte";
  import SetPadCharacter from "$lib/components/SetPadCharacter.svelte";
  import SetPadLength from "$lib/components/SetPadLength.svelte";
  import SetPrefix from "$lib/components/SetPrefix.svelte";
  import SetRecordsPerIncrement from "$lib/components/SetRecordsPerIncrement.svelte";
  import SetSerial from "$lib/components/SetSerial.svelte";
  import SetSerialPadded from "$lib/components/SetSerialPadded.svelte";
  import SetSuffix from "$lib/components/SetSuffix.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let editPanelVisible;
  export let fields;
  export let field;
  export let index;

  // VARIABLES
  let fieldClone = { ...field };
  let changeMade = false;

  // FIELD NAME VARIABLES
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

  // PAD VARIABLES
  let validPadLength = true;
  let editPad = false;
  $: serialPadded = !editPad ? fieldClone.serialPadded : serialPadded;
  $: padLength = !editPad ? fieldClone.padLength : padLength;
  $: padLead = !editPad ? fieldClone.padLead : padLead;
  $: padTrail = !editPad ? fieldClone.padTrail : padTrail;

  // PREFIX/SUFFIX VARIABLES
  let editPrefix = false;
  $: prefix = !editPrefix ? fieldClone.prefix : prefix;
  let editSuffix = false;
  $: suffix = !editSuffix ? fieldClone.suffix : suffix;

  // FIELD-TYPE VARIABLES
  let editType = false;
  $: type = !editType ? fieldClone.type : type;

  $: editMode =
    editFieldName ||
    editSerial ||
    editIncrement ||
    editRecordsPerIncrement ||
    editPad ||
    editPrefix ||
    editSuffix ||
    editType;

  $: saveButtonDisabled =
    !changeMade ||
    !validFieldName ||
    !validSerial ||
    !validIncrement ||
    !validRecordsPerIncrement ||
    !validPadLength;

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
      bind:editPrefix
      bind:editSuffix
      bind:editType
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
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:changeMade
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
      value={fieldName}
      validCheck={validFieldName}
      fieldToEditName="name"
    />
  {/if}

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
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:changeMade
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
      value={serial}
      validCheck={validSerial}
      fieldToEditName="serial"
    />
  {/if}

  {#if hasSerial}
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
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:changeMade
        {hasSerial}
        {serialPadded}
        {padLead}
        {padTrail}
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
        bind:editPrefix
        bind:editSuffix
        bind:editType
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
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:changeMade
        {hasSerial}
        {serialPadded}
        {padLead}
        {padTrail}
        value={recordsPerIncrement}
        validCheck={validRecordsPerIncrement}
        fieldToEditName="recordsPerIncrement"
      />
    {/if}

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
        {fieldClone}
        fieldId="Serial Padded"
        value="serialPadded"
      />
    {/if}

    {#if editPad}
      <!-- EACH OF THESE WILL BE A POP UP -->
      <SetSerialPadded bind:serialPadded />
      {#if serialPadded}
        <SetPadLength
          bind:padLength
          bind:validPadLength
          {serialPadded}
          {serial}
        />
        <SetPadCharacter bind:padLead bind:padTrail />
      {/if}
      <UpdateValuesButtons
        bind:fieldClone
        bind:field
        bind:editFieldName
        bind:editSerial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        bind:changeMade
        {hasSerial}
        {serialPadded}
        {padLead}
        {padTrail}
        value={prefix}
        validCheck={validPadLength}
        fieldToEditName="prefix"
      />
    {/if}
  {/if}

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
      {fieldClone}
      fieldId="Prefix"
      value="prefix"
    />
  {/if}

  {#if editPrefix}
    <!-- EACH OF THESE WILL BE A POP UP -->
    <SetPrefix bind:prefix />
    <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:changeMade
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
      value={prefix}
      validCheck={true}
      fieldToEditName="prefix"
    />
  {/if}

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
      {fieldClone}
      fieldId="Suffix"
      value="suffix"
    />
  {/if}

  {#if editSuffix}
    <!-- EACH OF THESE WILL BE A POP UP -->
    <SetSuffix bind:suffix />
    <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:changeMade
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
      value={suffix}
      validCheck={true}
      fieldToEditName="suffix"
    />
  {/if}

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
      {fieldClone}
      fieldId="Field Type"
      value="type"
    />
  {/if}

  {#if editType}
    <!-- EACH OF THESE WILL BE A POP UP -->
    <SetFieldType bind:type />
    <UpdateValuesButtons
      bind:fieldClone
      bind:field
      bind:editFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      bind:changeMade
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
      value={type}
      validCheck={true}
      fieldToEditName="type"
    />
  {/if}

  {#if !editMode}
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
