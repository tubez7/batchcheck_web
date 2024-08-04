<script>
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
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
  let minimumPadLength = null;
</script>

<FieldsetStyle --colour="rgb(114, 113, 113)" --background="rgb(222, 255, 244)">
  <SetSerialPadded bind:serialPadded editMode={false} />
</FieldsetStyle>

{#if serialPadded}
  <FieldsetStyle
    --colour="rgb(114, 113, 113)"
    --background="rgb(222, 255, 244)"
  >
    <SetPadLength
      bind:padLength
      bind:validPadLength
      bind:minimumPadLength
      {serialPadded}
      {serial}
      editMode={false}
    />
    <FieldsetStyle
      --colour="rgb(114, 113, 113)"
      --background="rgb(222, 255, 244)"
    >
      <SetPadCharacter bind:padLead bind:padTrail editMode={false} />
    </FieldsetStyle>
  </FieldsetStyle>
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
  {minimumPadLength}
  value={padLength}
  validCheck={validPadLength}
  fieldToEditName="padLength"
/>
