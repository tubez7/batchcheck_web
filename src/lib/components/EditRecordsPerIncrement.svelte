<script>
  // COMPONENTS
  import SetRecordsPerIncrement from "$lib/components/SetRecordsPerIncrement.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let editFieldName;
  export let validRecordsPerIncrement;
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

  // VARIABLES
  let recordsPerIncrement = fieldClone.recordsPerIncrement;
  $: recordsPerIncrement = !editRecordsPerIncrement
    ? fieldClone.recordsPerIncrement
    : recordsPerIncrement;
</script>

<SetRecordsPerIncrement
  bind:recordsPerIncrement
  bind:validRecordsPerIncrement
  {hasSerial}
  editMode={false}
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
  {hasSerial}
  {serialPadded}
  {padLead}
  {padTrail}
  value={recordsPerIncrement}
  validCheck={validRecordsPerIncrement}
  fieldToEditName="recordsPerIncrement"
/>
