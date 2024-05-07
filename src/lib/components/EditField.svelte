<script>
  // COMPONENTS
  import EditFieldName from "$lib/components/EditFieldName.svelte";
  import EditIncrement from "$lib/components/EditIncrement.svelte";
  import EditPad from "$lib/components/EditPad.svelte";
  import EditPrefix from "$lib/components/EditPrefix.svelte";
  import EditRecordsPerIncrement from "$lib/components/EditRecordsPerIncrement.svelte";
  import EditSerial from "$lib/components/EditSerial.svelte";
  import EditSuffix from "$lib/components/EditSuffix.svelte";
  import EditType from "$lib/components/EditType.svelte";
  import PopUp from "$lib/components/PopUp.svelte";

  // PROPS
  export let fieldClone;
  export let field;
  export let validFieldName;
  export let validSerial;
  export let validIncrement;
  export let validRecordsPerIncrement;
  export let validPadLength;
  export let editFieldName;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let editPad;
  export let editPrefix;
  export let editSuffix;
  export let editType;
  export let hasSerial;
  export let standardField;

  // VARIABLES
  let serial = fieldClone.serial;
  $: serial = !editSerial ? fieldClone.serial : serial;
  let serialPadded = fieldClone.serialPadded;
  $: serialPadded = !editPad ? fieldClone.serialPadded : serialPadded;
  let padLead = fieldClone.padLead;
  $: padLead = !editPad ? fieldClone.padLead : padLead;
  let padTrail = fieldClone.padTrail;
  $: padTrail = !editPad ? fieldClone.padTrail : padTrail;
</script>

<PopUp --colour="aquamarine">
  {#if editFieldName}
    <EditFieldName
      bind:fieldClone
      bind:field
      bind:editFieldName
      bind:validFieldName
      bind:editSerial
      bind:editIncrement
      bind:editRecordsPerIncrement
      bind:editPad
      bind:editPrefix
      bind:editSuffix
      bind:editType
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
    />
  {/if}

  {#if standardField}
    {#if editSerial}
      <EditSerial
        bind:fieldClone
        bind:field
        bind:editFieldName
        bind:validSerial
        bind:editSerial
        bind:serial
        bind:editIncrement
        bind:editRecordsPerIncrement
        bind:editPad
        bind:editPrefix
        bind:editSuffix
        bind:editType
        {hasSerial}
        {serialPadded}
        {padLead}
        {padTrail}
      />
    {/if}

    {#if hasSerial}
      {#if editIncrement}
        <EditIncrement
          bind:fieldClone
          bind:field
          bind:editFieldName
          bind:validIncrement
          bind:editSerial
          bind:editIncrement
          bind:editRecordsPerIncrement
          bind:editPad
          bind:editPrefix
          bind:editSuffix
          bind:editType
          {hasSerial}
          {serialPadded}
          {padLead}
          {padTrail}
        />
      {/if}
      {#if editRecordsPerIncrement}
        <EditRecordsPerIncrement
          bind:fieldClone
          bind:field
          bind:editFieldName
          bind:validRecordsPerIncrement
          bind:editSerial
          bind:editIncrement
          bind:editRecordsPerIncrement
          bind:editPad
          bind:editPrefix
          bind:editSuffix
          bind:editType
          {hasSerial}
          {serialPadded}
          {padLead}
          {padTrail}
        />
      {/if}
      {#if editPad}
        <EditPad
          bind:fieldClone
          bind:field
          bind:editFieldName
          bind:validPadLength
          bind:editSerial
          bind:editIncrement
          bind:editRecordsPerIncrement
          bind:editPad
          bind:editPrefix
          bind:editSuffix
          bind:editType
          {hasSerial}
          {serial}
          {serialPadded}
          {padLead}
          {padTrail}
        />
      {/if}
    {/if}
    {#if editPrefix}
      <EditPrefix
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
        {hasSerial}
        {serialPadded}
        {padLead}
        {padTrail}
      />
    {/if}
    {#if editSuffix}
      <EditSuffix
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
        {hasSerial}
        {serialPadded}
        {padLead}
        {padTrail}
      />
    {/if}
  {/if}
  {#if editType}
    <EditType
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
      {hasSerial}
      {serialPadded}
      {padLead}
      {padTrail}
    />
  {/if}
</PopUp>
