<script>
  // COMPONENTS
  import SetPadCharacter from "$lib/components/SetPadCharacter.svelte";
  import SetPadLength from "$lib/components/SetPadLength.svelte";
  import SetSerialPadded from "$lib/components/SetSerialPadded.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let editFieldName;
  export let validPadLength;
  export let fieldClone;
  export let field;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let editPad;
  export let editPrefix;
  export let editSuffix;
  export let editType;
  export let hasSerial;
  export let serialPadded;
  export let padLead;
  export let padTrail;
  export let serial;

  // VARIABLES
  let padLength = fieldClone.padLength;
  $: padLength = !editPad ? fieldClone.padLength : padLength;
</script>

<SetSerialPadded bind:serialPadded editMode={false} />
{#if serialPadded}
  <SetPadLength
    bind:padLength
    bind:validPadLength
    minimumPadLength={null}
    {serialPadded}
    {serial}
    editMode={false}
  />
  <SetPadCharacter bind:padLead bind:padTrail editMode={false} />
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
  {hasSerial}
  {serialPadded}
  {padLead}
  {padTrail}
  value={padLength}
  validCheck={validPadLength}
  fieldToEditName="padLength"
/>
