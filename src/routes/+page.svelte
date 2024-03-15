<script>
  class Field {
    constructor(
      name,
      hasSerial,
      serial,
      incrementValue,
      recordsPerIncrement,
      padded,
      padLength,
      padLead,
      padTrail,
      prefix,
      suffix,
      type
    ) {
      this.name = name;
      this.hasSerial = hasSerial;
      this.serial = serial;
      this.incrementValue = incrementValue;
      this.recordsPerIncrement = recordsPerIncrement;
      this.padded = padded;
      this.padLength = padLength;
      this.padLead = padLead;
      this.padTrail = padTrail;
      this.prefix = prefix;
      this.suffix = suffix;
      this.type = type;
    }
  }

  // - VARIABLES

  let records = 1;
  $: recordError = records < 1 ? true : false;
  let fields = [];
  let fieldName = "";
  let fieldNameError = false;
  $: validFieldName = fieldName.length < 1 ? false : true;
  let hasSerial = false;
  $: serial = hasSerial ? 0 : null;
  let serialError = false;
  let serialErrorMessage = "";
  let serialPadded = false;
  $: minimumPadLength = serialPadded ? serial.toString().length : null;
  let incrementValue = 0;
  let recordsPerIncrement = 1;
  let padLength = null;
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

  function checkSerial() {
    if (serial < 0) {
      serialError = true;
      serialErrorMessage = "Serial number cannot be less than 0";
    } else if (serial === null) {
      serialError = true;
      serialErrorMessage =
        "A valid serial number must be entered if field has a serial number";
    } else {
      serialError = false;
    }
    toggleButtonDisable();
  }

  function serialToggle() {
    if (hasSerial) {
      serialError = false;
      serialErrorMessage = "";
    }
    toggleButtonDisable();
  }

  function toggleButtonDisable() {
    if (recordError || !validFieldName || serialError) {
      buttonDisable = true;
    } else if (padLength !== null && padLength < minimumPadLength) {
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

  function resetValues() {
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

  function resetFields() {
    resetValues();
    fields = [];
  }

  function handleClick(e) {
    e.preventDefault();
    padLength = serialPadded ? padLength || minimumPadLength : null;
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

<h1>BATCH-CHECK v1.0</h1>

<fieldset>
  <legend>Batch-Check Constructor</legend>
  <form>
    <h2>Records</h2>
    <label for="batch-quantity">Batch/Record Qty: </label>
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
    <label for="field">Enter Field Name: </label>
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
    <input
      bind:checked={hasSerial}
      on:input={serialToggle}
      type="checkbox"
      id="has-serial"
    />
    {#if hasSerial}
      <label for="serial">Serial No#: </label>
      <input
        bind:value={serial}
        on:input={checkSerial}
        type="number"
        inputmode="numeric"
        min="0"
        id="serial"
        placeholder="Enter first serial number"
      />
      {#if serialError}
        <p>{serialErrorMessage}</p>
      {/if}
      <label for="increment">Increment each batch/record by: </label>
      <input
        bind:value={incrementValue}
        type="number"
        inputmode="numeric"
        id="increment"
        placeholder="Enter a whole integer (including negative values) to increment or decrement each record by"
      />
      <label for="records-per-increment">Records per increment: </label>
      <input
        bind:value={recordsPerIncrement}
        type="number"
        min="1"
        inputmode="numeric"
        id="records-per-increment"
        placeholder="Number increments every 'x' records"
      />
      <br />
      <br />
      <label for="pad">Pad serial: </label>
      <input bind:checked={serialPadded} type="checkbox" id="pad" />
      {#if serialPadded}
        <label for="pad-length">Pad length: </label>
        <input
          bind:value={padLength}
          on:input={toggleButtonDisable}
          type="number"
          inputmode="numeric"
          min={minimumPadLength}
          placeholder={minimumPadLength}
          id="pad-length"
        />
        <label for="pad-leading">Leading pad character: </label>
        <input
          bind:value={padLeading}
          type="text"
          id="pad-leading"
          maxLength="1"
          disabled={padTrailing.length > 0}
        />
        <label for="pad-trailing">Trailing pad character: </label>
        <input
          bind:value={padTrailing}
          type="text"
          id="pad-trailing"
          maxLength="1"
          disabled={padLeading.length > 0}
        />
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
      value="vis-scan"
      bind:group={type}
    />
    <label for="fieldType3">Visible Scan Check</label>
    <input
      type="radio"
      id="fieldType4"
      name="field-type"
      value="invis-scan"
      bind:group={type}
    />
    <label for="fieldType4">Invisible Scan Check</label>
    <br />
    <br />
    <button on:click={handleClick} disabled={buttonDisable}>Add Field</button>
    <button on:click={resetValues}>Reset Form</button>
  </form>
</fieldset>

{#if fields.length > 0}
  <div>
    <h2>EDIT BATCH-CHECK TABLE</h2>
    <h3>NUMBER OF BATCHES/RECORDS TO SCAN: {records}</h3>
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
    <button on:click={resetFields}>RESET ALL FIELDS</button>
  </div>
{/if}
