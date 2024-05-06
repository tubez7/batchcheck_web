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
    console.log("CreateFields mounted");
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
      console.log(initialised, "setDefaults called DEBUGGING ONLY. Pls remove");
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

<fieldset id="create-field-box">
  <h2>Field Type</h2>
  <div class="field-seperators">
    <SetFieldType bind:type />
  </div>

  <h2>Field Creation</h2>
  <fieldset>
    <div class="field-seperators">
      <SetFieldName bind:fieldName bind:validFieldName />
    </div>
    {#if standardField}
      <div class="field-seperators">
        <SetHasSerial bind:hasSerial />
      </div>
      {#if hasSerial}
        <div class="field-seperators">
          <SetSerial {hasSerial} bind:serial bind:validSerial />
        </div>
        <div class="field-seperators">
          <SetIncrement bind:incrementValue bind:validIncrement {hasSerial} />
        </div>
        <div class="field-seperators">
          <SetRecordsPerIncrement
            bind:recordsPerIncrement
            bind:validRecordsPerIncrement
            {hasSerial}
          />
        </div>
        <div class="field-seperators">
          <SetSerialPadded bind:serialPadded />
        </div>
        {#if serialPadded}
          <div class="field-seperators">
            <SetPadLength
              bind:padLength
              bind:validPadLength
              bind:minimumPadLength
              {serialPadded}
              {serial}
            />
          </div>
          <div class="field-seperators">
            <SetPadCharacter bind:padLead bind:padTrail />
          </div>
        {/if}
      {/if}
      <div class="field-seperators">
        <SetPrefix bind:prefix />
      </div>
      <div class="field-seperators">
        <SetSuffix bind:suffix />
      </div>
    {/if}
  </fieldset>
  <button on:click={handleSubmit} type="submit" disabled={buttonDisable}
    >Add Field</button
  >
  <button on:click={handleReset} type="reset">Reset Field Values</button>
</fieldset>

<style>
  #create-field-box {
    background-color: lightgreen;
  }
</style>
