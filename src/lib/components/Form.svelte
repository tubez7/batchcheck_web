<script>
  //import FieldsEdit from "$lib/components/FieldsEdit.svelte";
  import Field from "$lib/field";

  export let fields = [];
  export let records = 1;

  // - VARIABLES

  $: recordError = records < 1;
  let fieldName = "";
  let fieldNameError = false;
  $: validFieldName = !fieldName.length < 1;
  let hasSerial = false;
  $: serial = hasSerial ? 0 : null;
  $: validSerial = hasSerial ? serial === null || serial >= 0 : true;
  let incrementValue = 0;
  $: validIncrement = Number.isInteger(incrementValue);
  let recordsPerIncrement = 1;
  $: validRecordPerIncrement =
    recordsPerIncrement > 0 && Number.isInteger(recordsPerIncrement);
  let serialPadded = false;
  $: minimumPadLength = serialPadded
    ? serial
      ? serial.toString().match(/\d/g)?.length || 1
      : 1
    : null;
  let padLength = null;
  $: validPadLength = padLength === null || padLength >= minimumPadLength;
  let padLeading = "";
  let padTrailing = "";
  let prefix = "";
  let suffix = "";
  let type = "data";
  let buttonDisable = true;

  // - FUNCTIONS

  function checkFieldName() {
    if (fieldName.length < 1) {
      fieldNameError = true;
    } else {
      fieldNameError = false;
    }
    toggleButtonDisable();
  }

  function toggleButtonDisable() {
    if (
      recordError ||
      !validFieldName ||
      !validSerial ||
      !validIncrement ||
      !validRecordPerIncrement ||
      !validPadLength
    ) {
      buttonDisable = true;
    } else {
      buttonDisable = false;
    }
  }

  function addField(field) {
    console.log("field = ...", field);
    fields = [...fields, field];
    console.log("fields = ...", fields);
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
    buttonDisable = true;
  }

  function resetFields(e) {
    if (e) {
      e.preventDefault();
    }
    resetValues();
    fields = [];
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
      type
    );
    addField(field);
    resetValues();
  }
</script>

<fieldset>
  <legend>Batch-Check Constructor</legend>
  <p>NB - * denotes a mandatory field</p>
  <form>
    <h2>Records</h2>
    <label for="batch-quantity">Batch/Record Qty*: </label>
    <input
      bind:value={records}
      on:input={toggleButtonDisable}
      type="number"
      min="1"
      inputmode="numeric"
      id="batch-quantity"
      placeholder="Enter number of scans..."
    />
    {#if recordError}
      <p>The minimum amount of batch records is 1</p>
    {/if}

    <h2>Field Creation</h2>
    <label for="field">Enter Field Name*: </label>
    <input
      bind:value={fieldName}
      on:input={checkFieldName}
      type="text"
      id="field"
      placeholder="Column name"
    />
    {#if fieldNameError}
      <p>Field Name is a mandatory field</p>
    {/if}
    <br />
    <br />
    <label for="has-serial">Field has Serial#: </label>
    <input bind:checked={hasSerial} type="checkbox" id="has-serial" />
    {#if hasSerial}
      <label for="serial">Serial No#*: </label>
      <input
        bind:value={serial}
        on:input={toggleButtonDisable}
        type="number"
        inputmode="numeric"
        min="0"
        id="serial"
        placeholder="0"
      />
      {#if !validSerial}
        <p>Serial number cannot be less than 0</p>
      {/if}
      <br />
      <br />
      <label for="increment">Increment each batch/record by*: </label>
      <input
        bind:value={incrementValue}
        on:input={toggleButtonDisable}
        type="number"
        inputmode="numeric"
        id="increment"
        placeholder="Enter a whole integer (including negative values) to increment or decrement each record by"
      />
      {#if !validIncrement}
        <p>
          Number to increment serial by must be an integer (zero and negative
          values are accepted)
        </p>
      {/if}
      <label for="records-per-increment">Records per increment*: </label>
      <input
        bind:value={recordsPerIncrement}
        on:input={toggleButtonDisable}
        type="number"
        min="1"
        inputmode="numeric"
        id="records-per-increment"
        placeholder="Number increments every 'x' records"
      />
      {#if !validRecordPerIncrement}
        <p>Record per increment value must be an integer of 1 or greater</p>
      {/if}
      <br />
      <br />
      <label for="pad">Pad serial: </label>
      <input bind:checked={serialPadded} type="checkbox" id="pad" />
      {#if serialPadded}
        <label for="pad-length">Pad length*: </label>
        <input
          bind:value={padLength}
          on:input={toggleButtonDisable}
          type="number"
          inputmode="numeric"
          min={minimumPadLength}
          placeholder={minimumPadLength}
          id="pad-length"
        />
        {#if !validPadLength}
          <p>
            Pad length cannot be less than the length of the starting serial
            number
          </p>
        {/if}
        <br />
        <br />
        <fieldset>
          <p>
            Pad character*: {"(Will default to leading pad character of '0' if left unspecified"}
          </p>
          <label for="pad-leading">Leading pad character: </label>
          <input
            bind:value={padLeading}
            type="text"
            id="pad-leading"
            maxLength="1"
            placeholder="Enter a single pad character"
            disabled={padTrailing.length > 0}
          />
          <label for="pad-trailing">Trailing pad character: </label>
          <input
            bind:value={padTrailing}
            type="text"
            id="pad-trailing"
            maxLength="1"
            placeholder="Enter a single pad character"
            disabled={padLeading.length > 0}
          />
        </fieldset>
      {/if}
    {/if}
    <br />
    <br />
    <label for="prefix">Prefix/static text: </label>
    <input
      bind:value={prefix}
      type="text"
      id="prefix"
      placeholder="Enter field prefix text"
    />
    <br />
    <br />
    <label for="prefix">Suffix/static text: </label>
    <input
      bind:value={suffix}
      type="text"
      id="suffix"
      placeholder="Enter field suffix text"
    />

    <h2>Field Type</h2>
    <input
      type="radio"
      id="fieldType1"
      name="field-type"
      value="data"
      bind:group={type}
      checked
    />
    <label for="fieldType1">Data Field</label>
    <input
      type="radio"
      id="fieldType2"
      name="field-type"
      value="QR"
      bind:group={type}
    />
    <label for="fieldType2">QR Code</label>
    <input
      type="radio"
      id="fieldType3"
      name="field-type"
      value="visible-scan"
      bind:group={type}
    />
    <label for="fieldType3">Visible Scan Check</label>
    <input
      type="radio"
      id="fieldType4"
      name="field-type"
      value="invisible-scan"
      bind:group={type}
    />
    <label for="fieldType4">Invisible Scan Check</label>
    <br />
    <br />
    <button on:click={handleClick} type="submit" disabled={buttonDisable}
      >Add Field</button
    >
    <button on:click={resetValues} type="reset">Reset Form</button>
  </form>
</fieldset>

{#if fields.length > 0}
  <div>
    <h2>EDIT BATCH-CHECK TABLE</h2>
    <h3>NUMBER OF BATCHES/RECORDS TO CHECK: {records}</h3>
    <ul>
      {#each fields as field}
        <li>
          FIELD NAME: {field.name}
          <br />
          FIELD HAS SERIAL: {field.hasSerial}
          <br />
          FIELD SERIAL: {field.serial}
          <br />
          SERIAL INCREMENT VAL: {field.incrementValue}
          <br />
          SERIAL RECORDS PER INCREMENT: {field.recordsPerIncrement}
          <br />
          SERIAL HAS PAD: {field.padded}
          <br />
          SERIAL PAD LENGTH: {field.padLength}
          <br />
          SERIAL PAD LEAD CHAR: {field.padLead}
          <br />
          SERIAL PAD TRAIL CHAR: {field.padTrail}
          <br />
          FIELD PREFIX: {field.prefix}
          <br />
          FIELD SUFFIX: {field.suffix}
          <br />
          FIELD TYPE: {field.type}
        </li>
        <br />
        <br />
      {/each}
    </ul>
    <button on:click={resetFields} type="reset">RESET ALL FIELDS</button>
  </div>
{/if}

<!-- <FieldsEdit {fields} {records} {resetValues} /> -->
