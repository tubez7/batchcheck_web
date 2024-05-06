<script>
  // COMPONENTS
  import SetHasSerial from "$lib/components/SetHasSerial.svelte";
  import SetSerial from "$lib/components/SetSerial.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let validSerial;
  export let hasSerial;
  export let serial;
  export let editFieldName;
  export let fieldClone;
  export let field;
  export let editSerial;
  export let editIncrement;
  export let editRecordsPerIncrement;
  export let editPad;
  export let editPrefix;
  export let editSuffix;
  export let editType;
  export let changeMade;
  export let serialPadded;
  export let padLead;
  export let padTrail;
</script>

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
