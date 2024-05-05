<script>
  // IMPORTS
  import { onMount } from "svelte";

  // COMPONENTS
  import EditFieldButton from "$lib/components/EditFieldButton.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
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
  export let changeMade;
  export let editMode;

  // VARIABLES
  let initialised = false;

  // FIELD NAME VARIABLES
  $: fieldName = !editFieldName ? fieldClone.name : fieldName;

  // SERIAL VARIABLES
  $: serial = !editSerial ? fieldClone.serial : serial;
  $: hasSerial = !editSerial ? fieldClone.hasSerial : hasSerial;
  $: incrementValue = !editIncrement
    ? fieldClone.incrementValue
    : incrementValue;
  $: recordsPerIncrement = !editRecordsPerIncrement
    ? fieldClone.recordsPerIncrement
    : recordsPerIncrement;

  // PAD VARIABLES
  $: serialPadded = !editPad ? fieldClone.serialPadded : serialPadded;
  $: padLength = !editPad ? fieldClone.padLength : padLength;
  $: padLead = !editPad ? fieldClone.padLead : padLead;
  $: padTrail = !editPad ? fieldClone.padTrail : padTrail;

  // PREFIX/SUFFIX VARIABLES
  $: prefix = !editPrefix ? fieldClone.prefix : prefix;
  $: suffix = !editSuffix ? fieldClone.suffix : suffix;

  // FIELD-TYPE VARIABLES
  $: type = !editType ? fieldClone.type : type;
  $: standardField = fieldClone.type !== "Composite QR" && fieldClone.type !== "Composite-scan";

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
  $: console.log("A CHANGE HAS BEEN MADE!!", changeMade);

  onMount(() => {
    initialised = true;
    console.log("Mounted EDIT FIELD");
  });
</script>

<br />
<br />

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
  <PopUp --colour="aquamarine">
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
  </PopUp>
{/if}

{#if standardField}
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
    <PopUp --colour="aquamarine">
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
    </PopUp>
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
      <PopUp --colour="aquamarine">
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
      </PopUp>
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
      <PopUp --colour="aquamarine">
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
      </PopUp>
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
      <PopUp --colour="aquamarine">
        <SetSerialPadded bind:serialPadded />
        {#if serialPadded}
          <SetPadLength
            bind:padLength
            bind:validPadLength
            minimumPadLength={null}
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
          value={padLength}
          validCheck={validPadLength}
          fieldToEditName="padLength"
        />
      </PopUp>
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
    <PopUp --colour="aquamarine">
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
    </PopUp>
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
    <PopUp --colour="aquamarine">
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
    </PopUp>
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
    fieldId="Field Type"
    value="type"
  />
{/if}

{#if editType}
  <PopUp --colour="aquamarine">
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
  </PopUp>
{/if}
