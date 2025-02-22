<script>
  // IMPORTS
  import { nonWhiteSpaceRegex } from "$lib/utils.js";

  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

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
    // if (!validFieldName) {
    //   fieldNameError = true;
    // } else {
    //   fieldNameError = false;
    // }
    fieldNameError = !validFieldName;
  }
</script>

<FieldItemStyle>
  <label for="fieldName">Field Name*: </label>
  <input
    bind:value={fieldName}
    on:input={checkFieldName}
    type="text"
    id="fieldName"
    placeholder="Enter field name"
    disabled={editMode}
  />
</FieldItemStyle>

{#if fieldNameError}
  <p class="error-msg">Field Name is a mandatory field</p>
{/if}

<style>
  .error-msg {
    margin-top: 0;
    color: red;
    font-weight: bolder;
  }
</style>
