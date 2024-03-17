<script>
    export let fields;
    export let records;
    export let resetValues;

    function resetFields(e) {
      if (e) {
        e.preventDefault();
      }
      resetValues();
      fields = [];
    }
</script>

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
