<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
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
  export let serialPadded;
  export let padLead;
  export let padTrail;
</script>

<FieldsetStyle --colour="rgb(114, 113, 113)" --background="rgb(222, 255, 244)">
  <SetHasSerial bind:hasSerial editMode={false} />

  {#if hasSerial}
    <SetSerial bind:serial bind:validSerial {hasSerial} editMode={false} />
  {/if}
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
  value={serial}
  validCheck={validSerial}
  fieldToEditName="serial"
/>
