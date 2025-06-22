<script>
  // IMPORTS
  import Field from "$lib/field";
  import { getUniqueId } from "$lib/utils.js";
  import { onMount } from "svelte";
  // COMPONENTS
  import FieldsetStyle from "$lib/components/FieldsetStyle.svelte";
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
  import TwoButtons from "$lib/components/TwoButtons.svelte";

  // PROPS
  export let fields;
  export let editMode;
  export let fieldsClone;

  // VARIABLES
  let initialised = false;
  //$: fieldId = fields.length < 1 ? 1 : fieldId; // just declare variable here, e.g. let fieldId;
  $: fieldNumber = fields.length + 1;

  // Set FieldName
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
  $: standardField = type !== "Composite QR" && type !== "Composite Scan";

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
    fieldsClone = [...fieldsClone, field];
  }

  function setDefaults() {
    if (initialised) {
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
    const fieldId = getUniqueId(fields);
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
    handleReset();
  }

  onMount(() => {
    initialised = true;
    console.log("CreateFields mounted");
  });
</script>

<div class={`create-field-box-${opaqueOverlay}`}>
  <FieldsetStyle --colour="rgb(114, 113, 113)">
    <h2 class="header">Field Category</h2>

    <FieldsetStyle --background="rgb(171, 255, 171)">
      <SetFieldType bind:type {editMode} />
    </FieldsetStyle>

    <h2 class="header">Field Parameters</h2>
    <FieldsetStyle --background="rgb(171, 255, 171)">
      <SetFieldName bind:fieldName bind:validFieldName {editMode} />

      {#if standardField}
        <SetHasSerial bind:hasSerial {editMode} />
        {#if hasSerial}
          <FieldsetStyle --background="rgb(187, 242, 187)">
            <SetSerial {hasSerial} bind:serial bind:validSerial {editMode} />
            <SetIncrement
              bind:incrementValue
              bind:validIncrement
              {hasSerial}
              {editMode}
            />
            <SetRecordsPerIncrement
              bind:recordsPerIncrement
              bind:validRecordsPerIncrement
              {hasSerial}
              {editMode}
            />
          </FieldsetStyle>
          <SetSerialPadded bind:serialPadded {editMode} />
          {#if serialPadded}
            <FieldsetStyle --background="rgb(187, 242, 187)">
              <SetPadLength
                bind:padLength
                bind:validPadLength
                bind:minimumPadLength
                {serialPadded}
                {serial}
                {editMode}
              />
              <SetPadCharacter bind:padLead bind:padTrail {editMode} />
            </FieldsetStyle>
          {/if}
        {/if}

        <SetPrefix bind:prefix {editMode} />
        <SetSuffix bind:suffix {editMode} />
      {/if}
    </FieldsetStyle>

    <div class="button-block">
      <TwoButtons
        callbackFunc1={handleSubmit}
        button1text="Add Field"
        disableButton1={buttonDisable}
        type1="submit"
        callbackFunc2={handleReset}
        button2text="Reset Values"
        disableButton2={editMode}
        type2="reset"
      />
    </div>
  </FieldsetStyle>
</div>

<style>
  .create-field-box-create {
    background-color: rgb(144, 238, 144);
    border-radius: 1em;
  }

  .create-field-box-edit {
    background-color: rgb(66, 125, 66);
    opacity: 0.5;
    border-radius: 1em;
  }

  .button-block {
    text-align: center;
  }

  .header {
    margin-top: 0.25em;
    margin-bottom: 0.5em;
  }
</style>
