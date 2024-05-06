<script>
  // COMPONENTS
  import SetFieldType from "$lib/components/SetFieldType.svelte";
  import UpdateValuesButtons from "$lib/components/UpdateValuesButtons.svelte";

  // PROPS
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
  export let hasSerial;
  export let serialPadded;
  export let padLead;
  export let padTrail;

  // VARIABLES
  let type = fieldClone.type;
  $: type = !editType ? fieldClone.type : type;
</script>

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
