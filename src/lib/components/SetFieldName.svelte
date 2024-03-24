<script>
  // PROPS
  export let fieldName;
  export let validFieldName;
  export let fieldNameError = false;

  // FUNCTIONS
  function checkFieldName() {
    if (!validFieldName) {
      fieldNameError = true;
    } else {
      fieldNameError = false;
    }
  }
</script>

<label for="fieldName">Enter Field Name*: </label>
<input
  bind:value={fieldName}
  on:input={checkFieldName}
  type="text"
  id="fieldName"
  placeholder="Enter field name"
/>
{#if fieldNameError}
  <span>Field Name is a mandatory field</span>
{/if}
