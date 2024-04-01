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
  import { globalNumericRegex } from "$lib/utils.js";

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
  $: validIncrement = Number.isInteger(incrementValue) || !hasSerial;

  // Set Records Per Increment
  let recordsPerIncrement = 1;
  $: validRecordPerIncrement = hasSerial
    ? recordsPerIncrement > 0 && Number.isInteger(recordsPerIncrement)
    : true;

  //Set Pad
  let serialPadded = false;
  $: minimumPadLength = serialPadded
    ? serial
      ? serial.toString().match(globalNumericRegex)?.length || 1
      : 1
    : null;
  let padLength = null;
  $: validPadLength = padLength === null || padLength >= minimumPadLength;
  let padLeading = "";
  let padTrailing = "";

  // Set prefix/Suffix
  let prefix = "";
  let suffix = "";
  let type = "data";
  $: buttonDisable =
    !validFieldName ||
    !validSerial ||
    !validIncrement ||
    !validRecordPerIncrement ||
    !validPadLength;

  // FUNCTIONS
  function addField(field) {
    fields = [...fields, field];
  }

  function resetValues(e) {
    if (e) {
      e.preventDefault();
    }
    fieldName = "";
    hasSerial = false;
    incrementValue = 0;
    recordsPerIncrement = 1;
    serialPadded = false;
    padLength = null;
    padLeading = "";
    padTrailing = "";
    prefix = "";
    suffix = "";
    type = "data";
  }

  function handleClick(e) {
    e.preventDefault();
    padLength = serialPadded ? padLength || minimumPadLength : null;
    serial = hasSerial ? serial || 0 : null;
    padLeading = serialPadded
      ? padTrailing.length < 1 && padLeading.length < 1
        ? "0"
        : padLeading
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
      padLeading,
      padTrailing,
      prefix,
      suffix,
      type,
      fieldNumber
    );
    addField(field);
    resetValues();
  }

  // DEBUG WATCHERS
  $: console.log("fieldName = ", fieldName);
  $: console.log("validFieldName = ", validFieldName);
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
    <SetIncrement bind:incrementValue {validIncrement} />
    <SetRecordsPerIncrement
      bind:recordsPerIncrement
      {validRecordPerIncrement}
    />
    <br />
    <br />
    <SetSerialPadded bind:serialPadded />
    {#if serialPadded}
      <SetPadLength bind:padLength {validPadLength} {minimumPadLength} />
      <br />
      <br />
      <SetPadCharacter bind:padLeading bind:padTrailing />
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
  <button on:click={handleClick} type="submit" disabled={buttonDisable}
    >Add Field</button
  >
  <button on:click={resetValues} type="reset">Reset Field Values</button>
</fieldset>
