<script>
  // IMPORTS
  import { nonWhiteSpaceRegex } from "$lib/utils.js";
  // COMPONENTS
  import FieldItemStyle from "$lib/components/FieldItemStyle.svelte";

  // PROPS
  export let tableName = "";
  export let validName;

  // VARIABLES
  let tableNameError = false;
  $: validName = tableName.length !== 0 && nonWhiteSpaceRegex.test(tableName);

  // FUNCTIONS
  function checkTableName() {
    tableNameError = !validName;
  }

</script>

<FieldItemStyle>
  <label for="tableName">Table Name: </label>
  <input
    bind:value={tableName}
    on:input={checkTableName}
    type="text"
    id="tableName"
    placeholder="Enter table name"
  />
</FieldItemStyle>

{#if tableNameError}
  <p class="error-msg">Table name is a mandatory field</p>
{/if}

<style>
  .error-msg {
    margin-top: 0;
    color: red;
    font-weight: bolder;
  }
</style>
