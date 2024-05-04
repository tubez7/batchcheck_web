<script>
  // IMPORTS
  import Field from "$lib/field";
  import { onMount } from "svelte";
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

  // PROPS
  export let fields;

  // VARIABLES
  let initialised = false;

  onMount(() => {
    initialised = true;
    //let standardField = true;
    console.log("Mounted");
  });

  // Set FieldName
  $: fieldNumber = fields.length + 1;
  let fieldName = "";
  let validFieldName;

  // Set Serial
  let hasSerial = false;
  let serial = null;
  let validSerial = true;

  // Set Increment
  let incrementValue = 0;
  let validIncrement = true;

  // Set Records Per Increment
  let recordsPerIncrement = 1;
  let validRecordsPerIncrement = true;

  //Set Pad
  let serialPadded = false;
  let padLength = null;
  let minimumPadLength = null;
  let validPadLength = true;
  let padLead = "";
  let padTrail = "";

  // Set prefix/Suffix
  let prefix = "";
  let suffix = "";

  // Set Type
  let type = "Data";
  $: standardField = type !== "Composite QR" && type !== "Composite-scan";

  // Reactive
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

  function setDefaults() {
    if (initialised) {
      console.log("setDefaults called DEBUGGING ONLY. Pls remove");
      hasSerial = false;
      serial = null;
      incrementValue = 0;
      recordsPerIncrement = 1;
      serialPadded = false;
      padLength = null;
      padLead = "";
      padTrail = "";
      prefix = "";
      suffix = "";
    }
  }

  // $: standardField, initialised && setDefaults();

  $: standardField, setDefaults();

  function handleReset(e) {
    if (e) {
      e.preventDefault();
    }
    fieldName = "";
    hasSerial = false;
    serial = null;
    incrementValue = 0;
    recordsPerIncrement = 1;
    serialPadded = false;
    padLength = null;
    padLead = "";
    padTrail = "";
    prefix = "";
    suffix = "";
    type = "Data";
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
</script>

<fieldset>
  <h2>Field Type</h2>
  <SetFieldType bind:type />
  <p>
    Nb - Composite fields are special fields that only require a name. Their
    value is set from the Edit Field Menu
  </p>

  <h2>Field Creation</h2>
  <SetFieldName bind:fieldName bind:validFieldName />
  <br />
  <br />
  {#if standardField}
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
          bind:minimumPadLength
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
  {/if}
  <br />
  <br />
  <button on:click={handleSubmit} type="submit" disabled={buttonDisable}
    >Add Field</button
  >
  <button on:click={handleReset} type="reset">Reset Field Values</button>
</fieldset>
