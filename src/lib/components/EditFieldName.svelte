<script>
  // COMPONENTS
  import SetFieldName from "$lib/components/SetFieldName.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
  export let editFieldName;
  export let validFieldName;
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
  export let hasSerial;
  export let serialPadded;
  export let padLead;
  export let padTrail;

  // VARIABLES
  let fieldName = fieldClone.name;
  $: fieldName = !editFieldName ? fieldClone.name : fieldName;
</script>

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
