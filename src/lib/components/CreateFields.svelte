<script>
  // COMPONENTS
  import SetFieldName from "$lib/components/SetFieldName.svelte";
  import SetFieldType from "$lib/components/SetFieldType.svelte";
  import SetHasSerial from "$lib/components/SetHasSerial.svelte";
  import SetIncrement from "$lib/components/SetIncrement.svelte";
  import SetPadCharacter from "$lib/components/SetPadCharacter.svelte";
  import SetPadLength from "$lib/components/SetPadLength.svelte";
  import SetPrefix from "$lib/components/SetPrefix.svelte";
  import SetRecordsPerIncrement from "$lib/components/SetRecordsPerIncrement.svelte";
  import SetSerial from "$lib/components/SetSerial.svelte";
  import SetSerialPadded from "$lib/components/SetSerialPadded.svelte";
  import SetSuffix from "$lib/components/SetSuffix.svelte";
  // IMPORTS
  import Field from "$lib/field";

  // PROPS
  export let fields;

  // VARIABLES

  // Set FieldName
  $: fieldNumber = fields.length + 1;
  let fieldName = "";
  let validFieldName;

  // Set Serial
  let hasSerial = false;
  let serial = null;
  let validSerial = true;

  //Set Increment
  let incrementValue = 0;
  let validIncrement = true;

  // Set Records Per Increment
  let recordsPerIncrement = 1;
  let validRecordsPerIncrement = true;

  //Set Pad
  let serialPadded = false;
  let padLength = null;
  let validPadLength = true;
  let padLead = "";
  let padTrail = "";

  // Set prefix/Suffix
  let prefix = "";
  let suffix = "";
  let type = "data";
  $: buttonDisable =
    !validFieldName ||
    !validSerial ||
    !validIncrement ||
    !validRecordsPerIncrement ||
    !validPadLength;

  // FUNCTIONS
  function addField(field) {
    fields = [...fields, field];
  }

  function handleReset(e) {
    if (e) {
      e.preventDefault();
    }
    fieldName = "";
    hasSerial = false;
    incrementValue = 0;
    recordsPerIncrement = 1;
    serialPadded = false;
    padLength = null;
    padLead = "";
    padTrail = "";
    prefix = "";
    suffix = "";
    type = "data";
  }

  function handleSubmit(e) {
    e.preventDefault();
    padLength = serialPadded ? padLength || minimumPadLength : null;
    serial = hasSerial ? serial || 0 : null;
    padLead = serialPadded
      ? padTrail.length < 1 && padLead.length < 1
        ? "0"
        : padLead
      : "";
    incrementValue = incrementValue || 0;
    const field = new Field(
      fieldName,
      hasSerial,
      serial,
      incrementValue,
      recordsPerIncrement,
      serialPadded,
      padLength,
      padLead,
      padTrail,
      prefix,
      suffix,
      type,
      fieldNumber
    );
    addField(field);
    handleReset();
  }

  // DEBUG WATCHERS
  //$: console.log("fieldName = ", fieldName);
  //$: console.log("validFieldName = ", validFieldName);
  //$: console.log("hasSerial = ", hasSerial);
  //$: console.log("serial = ", serial, "validSerial = ", validSerial);
  // $: console.log("incrementValue changed to = ", incrementValue);
  // $: console.log("validIncrement changed to = ", validIncrement);
  // $: console.log("recordsPerIncrement changed to = ", recordsPerIncrement);
  // $: console.log(
  //   "validRecordPerIncrement changed to = ",
  //   validRecordPerIncrement
  // );
</script>

<fieldset>
  <h2>Field Creation</h2>
  <SetFieldName bind:fieldName bind:validFieldName />
  <br />
  <br />
  <SetHasSerial bind:hasSerial />
  {#if hasSerial}
    <SetSerial {hasSerial} bind:serial bind:validSerial />
    <br />
    <br />
    <SetIncrement bind:incrementValue bind:validIncrement {hasSerial} />
    <SetRecordsPerIncrement
      bind:recordsPerIncrement
      bind:validRecordsPerIncrement
      {hasSerial}
    />
    <br />
    <br />
    <SetSerialPadded bind:serialPadded />
    {#if serialPadded}
      <SetPadLength
        bind:padLength
        bind:validPadLength
        {serialPadded}
        {serial}
      />
      <br />
      <br />
      <SetPadCharacter bind:padLead bind:padTrail />
    {/if}
  {/if}
  <br />
  <br />
  <SetPrefix bind:prefix />
  <br />
  <br />
  <SetSuffix bind:suffix />

  <h2>Field Type</h2>
  <SetFieldType bind:type />
  <br />
  <br />
  <button on:click={handleSubmit} type="submit" disabled={buttonDisable}
    >Add Field</button
  >
  <button on:click={handleReset} type="reset">Reset Field Values</button>
</fieldset>
