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
  export let editMode;

  // VARIABLES
  let initialised = false;

  onMount(() => {
    initialised = true;
    console.log("CreateFields mounted");
  });

  let fieldId = 1;

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
    !validPadLength ||
    editMode;

  $: opaqueOverlay = editMode ? "edit" : "create";

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
      fieldNumber,
      fieldId
    );
    addField(field);
    fieldId++;
    handleReset();
  }
</script>

<div id={`create-field-box-${opaqueOverlay}`}>
  <fieldset>
    <h2>Field Type</h2>
    <div class="field-seperators">
      <SetFieldType bind:type {editMode} />
    </div>

    <h2>Field Creation</h2>
    <fieldset>
      <div class="field-seperators">
        <SetFieldName bind:fieldName bind:validFieldName {editMode} />
      </div>
      {#if standardField}
        <div class="field-seperators">
          <SetHasSerial bind:hasSerial {editMode} />
        </div>
        {#if hasSerial}
          <div class="field-seperators">
            <SetSerial {hasSerial} bind:serial bind:validSerial {editMode} />
          </div>
          <div class="field-seperators">
            <SetIncrement
              bind:incrementValue
              bind:validIncrement
              {hasSerial}
              {editMode}
            />
          </div>
          <div class="field-seperators">
            <SetRecordsPerIncrement
              bind:recordsPerIncrement
              bind:validRecordsPerIncrement
              {hasSerial}
              {editMode}
            />
          </div>
          <div class="field-seperators">
            <SetSerialPadded bind:serialPadded {editMode} />
          </div>
          {#if serialPadded}
            <div class="field-seperators">
              <SetPadLength
                bind:padLength
                bind:validPadLength
                bind:minimumPadLength
                {serialPadded}
                {serial}
                {editMode}
              />
            </div>
            <div class="field-seperators">
              <SetPadCharacter bind:padLead bind:padTrail {editMode} />
            </div>
          {/if}
        {/if}
        <div class="field-seperators">
          <SetPrefix bind:prefix {editMode} />
        </div>
        <div class="field-seperators">
          <SetSuffix bind:suffix {editMode} />
        </div>
      {/if}
    </fieldset>
    <button on:click={handleSubmit} type="submit" disabled={buttonDisable}
      >Add Field</button
    >
    <button on:click={handleReset} type="reset" disabled={editMode}
      >Reset Field Values</button
    >
  </fieldset>
</div>

<style>
  #create-field-box-create {
    background-color: lightgreen;
  }

  #create-field-box-edit {
    background-color: rgb(66, 125, 66);
    opacity: 0.5;
  }
</style>
