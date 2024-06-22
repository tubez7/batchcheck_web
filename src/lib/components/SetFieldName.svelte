<script>
  // IMPORTS
  import { nonWhiteSpaceRegex } from "$lib/utils.js";

  // PROPS
  export let fieldName;
  export let validFieldName;
  export let editMode;

  // VARIABLES
  let fieldNameError = false;
  $: validFieldName =
    !fieldName.length < 1 && nonWhiteSpaceRegex.test(fieldName);

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
  disabled={editMode}
/>

{#if fieldNameError}
  <p>Field Name is a mandatory field</p>
{/if}
