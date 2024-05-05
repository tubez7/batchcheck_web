<script>
  // COMPONENTS
  import EditFieldName from "$lib/components/EditFieldName.svelte";

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
</script>

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
    bind:changeMade
    {hasSerial}
    {serialPadded}
    {padLead}
    {padTrail}
  />
{/if}
