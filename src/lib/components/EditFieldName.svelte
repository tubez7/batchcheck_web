<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
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
  export let hasSerial;
  export let serialPadded;
  export let padLead;
  export let padTrail;

  // VARIABLES
  let fieldName = fieldClone.name;
  $: fieldName = !editFieldName ? fieldClone.name : fieldName;
</script>

<div class="container">
  <FieldsetStyle
    --colour="rgb(114, 113, 113)"
    --background="rgb(222, 255, 244)"
  >
    <SetFieldName bind:fieldName bind:validFieldName editMode={false} />
  </FieldsetStyle>

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
    value={fieldName}
    validCheck={validFieldName}
    fieldToEditName="name"
  />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
