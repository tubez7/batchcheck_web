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
      suffix
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
    }
  }

  let records = 1;
  let fields = [];
  let name = "";
  let hasSerial = false;
  let serial = 0;
  let incrementValue = 0;
  let recordsPerIncrement = 1;
  let serialPadded = false;
  let padLength;
  let padLeading = "";
  let padTrailing = "";
  let prefix = "";
  let suffix = "";

  function addField(field) {
    console.log("field = ...", field);
    fields = [...fields, field];
    console.log("fields = ...", fields);
  }

  function handleClick(e) {
    e.preventDefault();
    console.log("button clicked!");
    const field = new Field(
      name,
      hasSerial,
      serial,
      incrementValue,
      recordsPerIncrement,
      serialPadded,
      padLength,
      padLeading,
      padTrailing,
      prefix,
      suffix
    );
    addField(field);
    name = "";
    hasSerial = false;
    serial = 0;
    incrementValue = 0;
    recordsPerIncrement = 1;
    serialPadded = false;
    padLength = 1;
    padLeading = "";
    padTrailing = "";
    prefix = "";
    suffix = "";
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
      type="number"
      min="1"
      inputmode="numeric"
      id="batch-quantity"
      placeholder="Enter number of scans..."
    />

    <h2>Field Creation</h2>
    <label for="field">Enter Field Name: </label>
    <input bind:value={name} type="text" id="field" placeholder="Column name" />
    <br />
    <br />
    <label for="has-serial">Field has Serial#: </label>
    <input bind:checked={hasSerial} type="checkbox" id="has-serial" />
    {#if hasSerial}
      <label for="serial">Serial No#: </label>
      <input
        bind:value={serial}
        type="number"
        inputmode="numeric"
        min="0"
        id="serial"
        placeholder="Enter first serial number"
      />
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
          type="number"
          inputmode="numeric"
          min={serial.toString().length}
          placeholder={serial.toString().length}
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
    <label for="prefix">Prefix: </label>
    <input
      bind:value={prefix}
      type="text"
      id="prefix"
      placeholder="Enter field prefix text"
    />
    <br />
    <br />
    <label for="prefix">Suffix: </label>
    <input
      bind:value={suffix}
      type="text"
      id="suffix"
      placeholder="Enter field suffix text"
    />
    <br />
    <br />
    <button on:click={handleClick}>Add Field</button>
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
        </li>
        <br />
        <br />
      {/each}
    </ul>
  </div>
{/if}
