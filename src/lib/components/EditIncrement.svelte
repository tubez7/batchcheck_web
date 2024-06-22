<script>
  // COMPONENTS
  import SetIncrement from "$lib/components/SetIncrement.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let editFieldName;
  export let validIncrement;
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
  let incrementValue = fieldClone.incrementValue;
  $: incrementValue = !editIncrement
    ? fieldClone.incrementValue
    : incrementValue;
</script>

<SetIncrement
  bind:incrementValue
  bind:validIncrement
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
  minimumPadLength={null}
  value={incrementValue}
  validCheck={validIncrement}
  fieldToEditName="incrementValue"
/>
